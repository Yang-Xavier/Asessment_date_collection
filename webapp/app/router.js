
import login_pane from './login/LoginPanel'
import EditableForm from './module/EditableForm'

import {mount} from './util/node_util'


const RouterList = {
    'base': "/app/",
    'index': "login",
    "route_config": {
        'login': () => {
            mount(new login_pane(), $("#root"));
        },
        'admin': () => {

        },
        'academic': () => {

        },
        'tutor': () => {

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
            mount(new EditableForm(), $("#root"));
        }
    }



};


export default RouterList