// import route from 'riot-route'
import login_pane from './login/LoginPanel'
import {mount} from './util/node_util'
// import $ from 'jquery'

const RouterList = {
    'base': "/app/",
    'index': "login",
    "route_config": {
        'login': () => {

            mount(new login_pane(), $("body"));
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
        }
    }



};


export default RouterList