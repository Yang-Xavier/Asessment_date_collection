import $ from "jquery"
import request from 'superagent'
import route from 'riot-route'


import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';


import BaseNode from "../util/BaseNode"

import ModulesDisplay from'./ModulesDisplay'
import Popup from './Popup'

import {API} from '../util/constant'
import {get_format_token} from '../util/cookie_util'

import '../../style/project_style.css'
import {projects_data_parsing} from "../util/data_parse_util";

class ProjectCreate extends BaseNode{
    constructor(param) {
        super(param);

        this.set_state({
            'project_name': '',
            'project_due': '',
            'selected_id': []
        });

        this.container = $('<div class="project_create"/>');
        this.header = (() => {
            const container = $('<div class="header form-group"/>');

            const name_block = $('<div class="name_block form-control"><label>Project Name</label></div>');
            const name = $('<input type="text"/>');

            const time_block = $('<div class="time_block form-control"><label>Deadline</label></div>');
            const time = $('<input />');

            const module_selection_btn = $("<button class='form-control'><i/>Select Modules</button>");
            const save_btn = $("<button class='form-control'><i/>Save and Send</button>");

            name.on('change', () => {
               this.state['project_name'] = name.val();
            });

            module_selection_btn.on('click', () => {
                this.open_modules_selection()
            });

            save_btn.on('click', () => {
                const post_data = {};

                post_data['name'] = name.val();
                post_data['due_date'] = time.val();
                post_data['modules'] = this.state['selected_id'];

                request
                    .post(API.project)
                    .set("Authorization", get_format_token())
                    .send(post_data)
                    .then((data)=>{
                        return request
                                .get(API.project)
                                .set("Authorization", get_format_token())
                                .then(data => {
                                    window.global.projects = projects_data_parsing(data.body.projects);
                                    route("home/projects/pending");
                                },()=>{
                                    route("login")
                                })
                    }, ()=>{
                        route("login")
                    })
            });


            // time picker
            time.datepicker({dateFormat: 'dd/mm/yy'});

            name_block.append(name);
            time_block.append(time);

            container.append(name_block);
            container.append(time_block);

            container.append(module_selection_btn);
            container.append(save_btn);

            return container
        })();
        this.module_selection_display = $("<div class='display_content'></div>");
    }

    open_modules_selection() {
        const container = $("<div class='modules_block'/>");
        const modules_selection = new ModulesDisplay({'selectable': true, 'selected_items': this.state['selected_id']});
        const select_all = $("<div class='select_all_btn'>All</div>");
        const close = $("<div class='close_btn'><i class='fas fa-check-circle'></i></div>");

        close.on('click', () => {
            this.module_selection.close();
        });

        select_all.on('click', () => {
            modules_selection.select_all(true);
        });

        container.append(modules_selection.render());


        this.module_selection = new Popup(container);

        this.module_selection.add_appendix_to_content(select_all);
        this.module_selection.add_appendix_to_content(close);

        this.module_selection.set_on_close(() => {
            this.show_modules_selection(modules_selection);
        });

        this.module_selection.popup(900,700)
    }

    show_modules_selection(modules_selection) {

        this.state["selected_id"] = modules_selection.state['selected_items'];
        const selected_id = modules_selection.state['selected_items'];
        const all_items = modules_selection.state['modules'];
        const selected_modules = all_items.filter(term => {
            term['filled'] = false;
            return term.id in selected_id
        });

        const modules_display = new ModulesDisplay({
            modules: selected_modules,
            selectable: false,
            no_process: true
        });

        this.module_selection_display.html(modules_display.render())
    }

    render() {


        this.container.append(this.header);
        this.container.append(this.module_selection_display);

        return this.container;
    }

}

export default ProjectCreate;