import route from 'riot-route'

import login_pane from './login/LoginPanel'
import Header from './homepage/Header'
import AcademicPage from './homepage/AcademicPage'
import {mount} from './util/node_util'
// import YearTutor from "./login/YearTutor";


import YearTutor from "./login/YearTutor";
import EditableForm from "./module/EditableForm";

// Test


let home_page;
let academic_page = new AcademicPage();
// const tutor_page = new


const RouterList = {
    'base': "/app/",
    'index': "login",
    "route_config": {
        'login': () => {

            mount(new login_pane({
                "callback": (users) => {
                    const user_type = users['user_type'];
                    switch (user_type) {
                        case "academic":
                            home_page = new AcademicPage();
                            break
                    }
                    route("home")
                }}), $("#root"));
        },
        'home': () => {
            mount(home_page, $("#root"));
        },
        'academic': () => {
            // mount(new AcademicPage(), $("#root"));
        },
        'tutor': () => {
            // mount(new YearTutor(), $("#root"));
        },
        'visualisation/*..': (graph_type)=>{
            // switch (graph_type) {
            //     case 'heat_map' :
            //         break;
            //     default:
            //         break;
            // }

        },
        'module/*': (module_id)=>{
            console.log(module_id)
        },
        'default': () =>{
            console.log("404")
        },
        'test': () => {
            mount(new AcademicPage(), $("#root"));
        },
        'form': () => {
            mount(new EditableForm(), $("#root"));
        }
    }



};


export default RouterList