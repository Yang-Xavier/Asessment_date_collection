import $ from 'jquery';
import route from 'riot-route'
import MyRouter from "./router"

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/base.css'
import 'animate.css'

// import './test/index'
/*for test index*/

const config = MyRouter['route_config'];
for (let route_ in config) {
    route(route_, config[route_])
}

route.start(true)
route.base(MyRouter['base']);
route('/login');