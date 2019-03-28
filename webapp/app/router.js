import route from 'riot-route'

import login_pane from './login/LoginPanel'

import AcademicPage from './homepage/AcademicPage'
import TutorPage from './homepage/TutorPage'
import LTMPage from './homepage/LTMPage'

import FormsDisplay from './module/FormsDisplay'

import EditableForm from "./module/EditableForm";
import {mount} from './util/node_util'

import '../style/home_page.css'



let user_inform = {
    "user_type": 'ltm',
    "user_name": 'Xavier'
};
let home_page  = new AcademicPage(user_inform); // test

const RouterList = {
    'base': "/app/",
    'index': "login",
    "route_config": {
        'login': () => {
            mount(new login_pane({
                "callback": () => {
                    // request user information here
                    switch (user_inform['user_type']) {
                        case "academic":
                            home_page = new AcademicPage(user_inform);
                            break;
                        case "ltm":
                            home_page = new LTMPage(user_inform);
                            break;
                        case "tutor":
                            home_page = new TutorPage(user_inform);
                            break
                    }
                    route("home")
                }}), $("#root"));
        },
        'home': () => {
            mount(home_page, $("#root"));
        },
        'home/forms/*': (status) => {
            // some request here

            const project_display = new FormsDisplay();
            home_page.mount_content(project_display);
            home_page.set_state({status: status})
            if(!home_page.mounted)
                mount(home_page, $("#root"));
        },
        'home/form/*': (id) => {
            // some request here

            const form_fields = new EditableForm();
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
            mount(new TutorPage(), $("#root"));
        }
    }
};

export default RouterList