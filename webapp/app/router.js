
import login_pane from './login/LoginPanel'
import Header from './homepage/Header'
import AcademicPage from './homepage/AcademicPage'
import {mount} from './util/node_util'
// import YearTutor from "./login/YearTutor";


import YearTutor from "./login/YearTutor";
import EditableForm from "./module/EditableForm";


const RouterList = {
    'base': "/app/",
    'index': "login",
    "route_config": {
        'login': () => {
            mount(new login_pane(), $("#root"));
        },
        'admin': () => {
            // mount(new LTM(), $("#root"));
        },
        'academic': () => {
            mount(new AcademicPage(), $("#root"));
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
        }
    }



};


export default RouterList