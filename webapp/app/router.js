import route from 'riot-route'

import login_pane from './login/LoginPanel'

import AcademicPage from './homepage/AcademicPage'
import TutorPage from './homepage/TutorPage'
import LTMPage from './homepage/LTMPage'

import FormsDisplay from './module/FormsDisplay'

import EditableForm from "./module/EditableForm";
import ReadOnlyForm from "./module/ReadOnlyForm";

import ProjectDisplay from "./module/ProjectDisplay"

import {mount} from './util/node_util'

import '../style/home_page.css'



let user_inform = {
    "user_type": 'ltm',
    "user_name": 'Xavier'
};
let home_page  = new LTMPage(user_inform); // test

const RouterList = {
    'base': "/app/",
    'index': "login",
    "route_config": {
        'login': () => {
            mount(new login_pane({
                "callback": () => {
                    // request user information here
                    // user_inform
                    // set username to cookie
                    //
                    //
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

            const new_form = {
                data: [
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    }
                    ,
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: true,
                        form_id: 1
                    }
                ]
            };
            const submitted_form = {
                data: [
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    }
                    ,
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    },
                    {
                        form_name:"testtesttesttesttesttesttesttesttesttest",
                        form_submitted_date:"00/00/0000",
                        form_release_date:"00/00/0000",
                        form_due:"00/00/0000",
                        editable: false,
                        form_id: 2
                    }
                ]
            };

            //

            let data;
            switch (status) {
                case 'new':
                    data = new_form;
                    break;
                case 'submitted':
                    data = submitted_form;
                    break;
            }

            let project_display = new FormsDisplay(data);

            home_page.mount_content(project_display);
            home_page.set_state({status: status});

            if(!home_page.mounted)
                mount(home_page, $("#root"));
        },

        'home/projects/*': (status) => {
            // some request here
            const projects_done = {
                data: [
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done: true,
                        project_id: 1
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done: true,
                        project_id: 1
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done:true,
                        project_id: 1
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '200/200',
                        done: true,
                        project_id: 1
                    }
                ]};

            const projects_pending = {
                data: [
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    }
                    ,
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    },
                    {
                        project_name:"testtesttesttesttesttesttesttesttesttest",
                        project_release:"00/00/0000",
                        project_due:"00/00/0000",
                        status: '100/200',
                        done: false,
                        checking: true,
                        project_id: 2
                    }
                ]
            };


            let data;
            switch (status) {
                case 'done':
                    data = projects_done;
                    break;
                case 'pending':
                    data = projects_pending;
                    break;
            }

            let project_display = new ProjectDisplay(data);
            home_page.mount_content(project_display);
            home_page.set_state({status: status});

            if(!home_page.mounted)
                mount(home_page, $("#root"));
        },


        'home/form/*': (id) => {
            // some request here
            const mock_data_new = {
                "semester": 'Semester 1 only',
                "editable":true,
                "form_name": "Form Name",
                "username": "User Name",
                "module_code": "COM6666",
                "form_data":[
                    {
                    "asm_format": "MOLE quiz",
                    "asm_name": "Test",
                    "asm_per": "100",
                    "asm_release": "00/00/0000",
                    "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    }
            ]};
            const mock_data_submitted = {
                "semester": 'Semester 1 only',
                "editable":false,
                "form_name": "Form Name",
                "username": "User Name",
                "module_code": "COM6666",
                "form_data":[
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    },
                    {
                        "asm_format": "MOLE quiz",
                        "asm_name": "Test",
                        "asm_per": "100",
                        "asm_release": "00/00/0000",
                        "asm_due": "00/00/0000" ,
                    }
                ]};

            let data = {"editable": true};
            //


            let form_fields;
            if(data['editable']) {
                data = mock_data_new;
                form_fields = new EditableForm(data);
            } else {
                data = mock_data_submitted;
                form_fields = new ReadOnlyForm(data);
            }

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
