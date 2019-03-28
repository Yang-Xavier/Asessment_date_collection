import $ from 'jquery';
import route from 'riot-route'
import MyRouter from "./router"


import '../style/base.css'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// import './test/index'
/*for test index*/


const config = MyRouter['route_config'];
for (let route_ in config) {
    route(route_, config[route_])
}



route.start(true);
route.base(MyRouter['base']);

const current_path = location.pathname;
const param = location.search;
const hash = location.hash;


// Response to the address change
const re = new RegExp(MyRouter['base']);
if(re.exec(current_path) == null) {
    route(MyRouter['index']);
} else {
    route(current_path.substr(MyRouter['base'].length) + param + hash);
}
