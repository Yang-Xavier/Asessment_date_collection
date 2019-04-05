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

import {mount} from './util/node_util'
import {API} from './util/constant'
import {get_format_token} from './util/cookie_util'
import {projects_data_parsing} from './util/data_parse_util'


import '../style/home_page.css'



let user_inform={};

let home_page;

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

            const new_form = {
                data: [
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    }
                    ,
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    }
                ]
            };
            const submitted_form = {
                data: [
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    }
                    ,
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    }
                ]
            };

            //

            let data;
            switch (status) {
                case 'new':
                    data = new_form;
                    break;
                case 'submitted':
                    data = submitted_form;
                    break;
            }

            let project_display = new FormsDisplay(data);

            mount_to_homepage(project_display, status)

        },

        'home/projects/*': (status) => {

            let project_display;

            if(status == 'creating') {
                project_display = new ProjectCreate();
                mount_to_homepage(project_display, status)

            }
            else {
                request
                    .get(API.project)
                    .set("Authorization", get_format_token())
                    .then((data)=>{
                        let project_data;

                        switch (status) {
                            case 'done':
                                project_data = [].filter.call(data.body.projects, term => term.state=='done');
                                project_data = projects_data_parsing(project_data);
                                break;
                            case 'pending':
                                project_data = [].filter.call(data.body.projects, term => term.state=='created');

                                project_data = projects_data_parsing(project_data);
                                break;
                        }

                        project_display = new ProjectDisplay({data: project_data});
                        mount_to_homepage(project_display, status)
                    }, () => {route('login')})
            }

            const projects_done = {
                data: [
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done: true,
                        project_id: 1
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done: true,
                        project_id: 1
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done:true,
                        project_id: 1
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done: true,
                        project_id: 1
                    }
                ]};

            const projects_pending = {
                data: [
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    }
                    ,
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    }
                ]
            };


        },

        'home/project/creating': () => {

            let project_display = new ProjectCreate();
            mount_to_homepage(project_display)
        },

        'home/project/*': (id) => {
            const mock_data = {
                modules: [
                    {
                        id:0,
                        name:'Team Software Project',
                        code: "COM666",
                        details: {
                            capacity: 100,
                            lecturer: "ABCABCABC"
                        },
                        filled: false
                    },{
                        id:1,
                        name:'Team Software Project',
                        code: "COM666",
                        details: {
                            capacity: 100,
                            lecturer: "ABCABCABC"
                        },
                        filled: true
                    },{
                        id:2,
                        name:'Team Software Project',
                        code: "COM666",
                        details: {
                            capacity: 100,
                            lecturer: "ABCABCABC"
                        },
                        filled: true
                    },
                ],
                project_name: "TESTTESTTESTTESTTESTTESTTESTTEST",
                project_due: "00/00/000",
                status: "00/000",
                state: 'pending'

            }

            mount_to_homepage(new ProjectDetails(mock_data));
        },

        'home/form/*': (id) => {
            // some request here
            const mock_data_new = {
                "semester": 'Semester 1 only',
                "editable":true,
                "form_name": "Form Name",
                "username": "User Name",
                "module_code": "COM6666",
                "form_data":[
                    {
                    "asm_format": "MOLE quiz",
                    "asm_name": "Test",
                    "asm_per": "100",
                    "asm_release": "00/00/0000",
                    "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    }
            ]};
            const mock_data_submitted = {
                "semester": 'Semester 1 only',
                "editable":false,
                "form_name": "Form Name",
                "username": "User Name",
                "module_code": "COM6666",
                "form_data":[
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    }
                ]};

            let data = {"editable": true};
            //


            let form_fields;
            if(data['editable']) {
                data = mock_data_new;
                form_fields = new EditableForm(data);
            } else {
                data = mock_data_submitted;
                form_fields = new ReadOnlyForm(data);
            }

            home_page.mount_content(form_fields);
            if(!home_page.mounted)
                mount(home_page, $("#root"));
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
            return frame
        }, ()=>{route('login')});
}

const mount_to_homepage = (node, status) => {
    if (!home_page) {
        mount_homepage_frame()
            .then(page => {
                page.mount_content(node);
                page.set_state({status: status});
                home_page = page;
                mount(home_page, $("#root"))
            })
    } else {
        home_page.mount_content(node);
        home_page.set_state({status: status});
    }
}


export default RouterList;