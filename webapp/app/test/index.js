import route from 'riot-route'
import '../../style/test.css'
// import login_pane from '../login/LoginPanel'
// import {mount} from '../util/node_util'

// import $ from 'jquery'

// const MyRouter = {
//     'base': "/app",
//     "route_config": {
//         '/app/login': () => {
//             mount(login_pane)
//         }
//     }
// }

// const config = MyRouter['route_config']
// for (let route_ in config) {
//     route(route_, config[route_](route))
// }
route('/login', () => {
    // mount(login_pane)
});


// route.start(true);
// route.base('/app/');
// route('/login');