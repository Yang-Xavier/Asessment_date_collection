import route from 'riot-route'
import request from 'superagent'
import Cookies from 'js-cookie'

import login_pane from './login/LoginPanel'

import AcademicPage from './homepage/AcademicPage'
import TutorPage from './homepage/TutorPage'
import LTMPage from './homepage/LTMPage'

import FormsDisplay from './module/FormsDisplay'

import EditableForm from "./module/EditableForm";
import ReadOnlyForm from "./module/ReadOnlyForm";

import ProjectDisplay from "./module/ProjectDisplay"
import ProjectCreate from "./module/ProjectCreate"
import ProjectDetails from "./module/ProjectDetails"

import Heatmap from './module/Heatmap'

import {mount} from './util/node_util'
import {API} from './util/constant'
import {get_format_token} from './util/cookie_util'
import {projects_data_parsing} from './util/data_parse_util'


import '../style/home_page.css'



let user_inform={};

let home_page;

let home_status;

const RouterList = {
    'base': "/app/",
    'index': "login",
    "route_config": {
        'login': () => {
            mount(new login_pane(), $("#root"));
        },

        'home': () => {
            mount_homepage_frame()
                .then(page => {
                    home_page = page;
                    mount(home_page, $("#root"))
                })
        },

        'home/forms/*': (status) => {
            // some request here

            home_status = status;



            mount_to_homepage(()=>{
                let data = [];
                let projects;
                projects = window.global.projects;
                for( let i in projects) {

                    for (let j in projects[i].forms) {
                        const form_content = {};
                        form_content["editable"] = false;
                        form_content["form_due"] = projects[i]["project_due"];
                        form_content["form_submitted_date"] = projects[i].forms[j]["form_submitted_date"];
                        form_content["id"] = projects[i].forms[j]["form_id"];
                        form_content["form_release_date"] = projects[i]["project_create"];
                        form_content["form_name"] = projects[i]["project_name"];
                        form_content["state"] = projects[i]["state"];
                        form_content["module"] = projects[i].forms[j]["module"]["code"];
                        data.push(form_content)
                    }
                }
                switch (status) {
                    case 'new':
                        data= [].filter.call(data, term => term.state != 'done');

                        break;
                    case 'submitted':
                        data= [].filter.call(data, term => term.state == 'done');
                        break;
                }

               return new FormsDisplay({data: data});
            })

        },

        'home/projects/*': (status) => {

            let project_display;

            home_status = status;

            mount_to_homepage(()=>{
                let project_data;

                switch (status) {
                    case 'done':
                        project_data = [].filter.call(window.global.projects, term => term.state=='done');
                        break;
                    case 'pending':
                        project_data = [].filter.call(window.global.projects, term => term.state=='waiting_on_academics');
                        break;
                    case 'visualizable':
                        project_data = [].filter.call(window.global.projects, term => term.state=='assessment_data_collected' || term.state=='done');
                        break;
                }

                project_display = new ProjectDisplay({data: project_data});

                return project_display

            }, status)


        },

        'home/project/creating': () => {
            mount_to_homepage(() =>  new ProjectCreate())
        },

        'home/project/*': (id) => {

            mount_to_homepage(() =>{
                const data = [].filter.call(window.global.projects,project => project.project_id == (id+""))[0];
                data["modules"] = data["forms"];
                return new ProjectDetails(data)
            });
        },

        'home/form/*': (id) => {
            // some request here


            mount_to_homepage(()=>{
                let data = {};
                let projects;
                projects = window.global.projects;
                for( let i in projects) {
                    for (let j in projects[i].forms) {
                        if( projects[i].forms[j]["form_id"] == id) {
                            data = {
                                'form_data': projects[i].forms[j]["assessments"],
                                'editable': projects[i].state != 'done' && window.global.user["user_type"] == 'academic',
                                'form_name': projects[i]['project_name'],
                                'semester': projects[i].forms[j].module["semester"],
                                'username': projects[i].forms[j].module["academic_name"],
                                'module_code': projects[i].forms[j].module["code"],
                                'id': id
                            };
                            break;
                        }
                    }
                }

                let form_fields;
                if(data['editable']) {
                    form_fields = new EditableForm(data);
                } else {
                    form_fields = new ReadOnlyForm(data);
                }

                return form_fields;
            })
        },

        'visualisation/*..': (graph_type)=>{

        },
        'module/*': (module_id)=>{
            console.log(module_id)
        },
        'default': () =>{
            console.log("404")
        },
        'test': () => {
            mount_to_homepage(()=>{
                return new Heatmap()
            })
        }
    }
};

const mount_homepage_frame = () => {
    let frame;

    return request
        .get(API.user)
        .set("Authorization", get_format_token())
        .then((d) => {
            const data = d.body;
            user_inform["user_type"] = data.user["usertype"];
            user_inform["user_name"] = data.user["name"];
            window.global.user = user_inform;
            switch (user_inform['user_type']) {
                case "academic":
                    frame = new AcademicPage(user_inform);
                    break;
                case "ltm":
                    frame = new LTMPage(user_inform);
                    break;
                case "tutor":
                    frame = new TutorPage(user_inform);
                    break
            }
            frame.set_state({status: ""})

        }, ()=>{route('login')})
        .then(() => {
            return request
                .get(API.modules)
                .set("Authorization", get_format_token())
                .then(data => {
                    window.global.modules = data.body.modules;
                    return request
                        .get(API.project)
                        .set("Authorization", get_format_token())
                        .then(data => {
                            window.global.projects = projects_data_parsing(data.body.projects);
                            return frame
                        })
                })
        })
}

const mount_to_homepage = (node_fn) => {
    if (!home_page) {
        mount_homepage_frame()
            .then(page => {
                    page.mount_content(node_fn());
                    page.set_state({status: home_status});
                    home_page = page;
                    mount(home_page, $("#root"))
                })
    } else {
        home_page.mount_content(node_fn());
        home_page.set_state({status: home_status});
    }
};


export default RouterList;