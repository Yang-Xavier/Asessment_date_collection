import route from 'riot-route'
import login_pane from './login/LoginPanel'
import {mount} from './util/node_util'
// import $ from 'jquery'

const RouterList = {
    'base': "/app/",
    "route_config": {
        '/login': () => {
            mount(login_pane)
        },
        // '/app/admin': () => {
        //     // switch (role_type) {
        //     //     case 'admin':
        //     //         break;
        //     //     case 'academic':
        //     //         break;
        //     //     case 'tutor':
        //     //         break;
        //     //     default:
        //     //         break;
        //     // }
        //     console.log(123)
        // },

        // 'app/visualisation/*..': (graph_type)=>{
        //     switch (graph_type) {
        //         case 'heat_map' :
        //             break;
        //         default:
        //             break;
        //     }
        // },
        // 'app/module/*': (module_id)=>{
        //
        // },
    }



};


export default RouterList