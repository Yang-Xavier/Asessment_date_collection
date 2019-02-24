import route from 'riot-route'
import $ from 'jquery'

const RouterList = {
    'default': () => {
        // 404
    },
    '/app/login': () => {

    },
    '/app/*': (role_type) => {
        switch (role_type) {
            case 'admin':
                break;
            case 'academic':
                break;
            case 'tutor':
                break;
            default:
                break;
        }
    },
    'app/visualisation/*..': (graph_type)=>{
        switch (graph_type) {
            case 'heat_map' :
                break;
            default:
                break;
        }
    }

};


export default RouterList