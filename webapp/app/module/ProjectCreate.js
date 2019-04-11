import $ from "jquery"
import request from 'superagent'
import route from 'riot-route'

import '../lib/DateRangePicker';


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
            'semester1': { "start": '', "end": '', "exam_period": {"start": '', "end": ''} },
            'semester2': { "start": '', "end": '', "exam_period": {"start": '', "end": ''} },
            'selected_id': []
        });

        this.container = $('<div class="project_create"/>');
        this.header = (() => {
            const container = $('<div class="header form-group"/>');

            const name_block = $('<div class="name_block form-control"><label>Project Name</label></div>');
            const name = $('<input type="text"/>');

            const time_block = $('<div class="time_block form-control"><label>Form Collection Date </label></div>');
            const time = $('<input />');

            const acdemic_period_1 = $('<div class="period_block form-control"><label>Period of 1st Semester</label></div>')
            const p1 = $('<input />');

            const acdemic_period_2 = $('<div class="period_block form-control"><label> Period of 2nd Semester</label></div>')
            const p2 = $('<input />');

            const exam_period1 = $('<div class="e_period_block period_block form-control"><label> Examination Period of 1st Semester</label></div>')
            const e1 = $('<input />');

            const exam_period2 = $('<div class="e_period_block period_block form-control"><label> Examination Period of 2nd Semester</label></div>')
            const e2 = $('<input />');



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
                post_data["semester1"] = this.state['semester1'];
                post_data["semester2"] = this.state['semester2'];

                // console.log(post_data)

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
            time.daterangepicker({
                locale: {
                    format: "DD/MM/YYYY"
                },
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: false,
            });
            time.on('apply.daterangepicker', (ev, picker) => {
                time.val(picker.startDate.format('MM/DD/YYYY'));
                this.state["project_due"] = time.val();
            });
            time.on('cancel.daterangepicker', (ev, picker) => {
                time.val('');
                this.state["project_due"] = time.val();
            });

            p1.daterangepicker({
                locale: {
                    format: "DD/MM/YYYY"
                },
                autoUpdateInput: false,
            });
            p1.on('apply.daterangepicker', (ev, picker) => {
                const start = picker.startDate.format('MM/DD/YYYY');
                const end = picker.endDate.format('MM/DD/YYYY');

                p1.val(start + " - " + end);
                this.state["semester1"]["start"] = start;
                this.state["semester1"]["end"] = end;
            });
            p1.on('cancel.daterangepicker', (ev, picker) => {
                p1.val('');
                this.state["semester1"]["start"] = "";
                this.state["semester1"]["end"] = "";
            });

            p2.daterangepicker({
                locale: {
                    format: "DD/MM/YYYY"
                },
                autoUpdateInput: false,
            });
            p2.on('apply.daterangepicker', (ev, picker) => {
                const start = picker.startDate.format('MM/DD/YYYY');
                const end = picker.endDate.format('MM/DD/YYYY');

                p2.val(start + " - " + end);
                this.state["semester2"]["start"] = start;
                this.state["semester2"]["end"] = end;
            });
            p2.on('cancel.daterangepicker', (ev, picker) => {
                p2.val('');
                this.state["semester2"]["start"] = "";
                this.state["semester2"]["end"] = "";
            });

            e1.daterangepicker({
                locale: {
                    format: "DD/MM/YYYY"
                },
                autoUpdateInput: false,
            });
            e1.on('apply.daterangepicker', (ev, picker) => {
                const start = picker.startDate.format('MM/DD/YYYY');
                const end = picker.endDate.format('MM/DD/YYYY');

                e1.val(start + " - " + end);
                this.state["semester1"]["exam_period"]["start"] = start;
                this.state["semester1"]["exam_period"]["end"] = end;
            });
            e1.on('cancel.daterangepicker', (ev, picker) => {
                e1.val('');

                this.state["semester1"]["exam_period"]["start"] = "";
                this.state["semester1"]["exam_period"]["end"] = "";
            });


            e2.daterangepicker({
                locale: {
                    format: "DD/MM/YYYY"
                },
                autoUpdateInput: false,
            });
            e2.on('apply.daterangepicker', (ev, picker) => {
                const start = picker.startDate.format('MM/DD/YYYY');
                const end = picker.endDate.format('MM/DD/YYYY');

                e2.val(start + " - " + end);
                this.state["semester2"]["exam_period"]["start"] = start;
                this.state["semester2"]["exam_period"]["end"] = end;
            });
            e2.on('cancel.daterangepicker', (ev, picker) => {
                e2.val('');

                this.state["semester2"]["exam_period"]["start"] = "";
                this.state["semester2"]["exam_period"]["end"] = "";
            });


            name_block.append(name);
            time_block.append(time);
            acdemic_period_1.append(p1);
            acdemic_period_2.append(p2);
            exam_period1.append(e1);
            exam_period2.append(e2);

            container.append(name_block);
            container.append(acdemic_period_1);
            container.append(exam_period1);
            container.append(acdemic_period_2);
            container.append(exam_period2);
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

        // this.state["selected_id"] = modules_selection.state['selected_items'];
        let selected_id = modules_selection.state['selected_items'];
        const all_items = modules_selection.state['modules'];

        const id_dict = {}
        for(let i in selected_id) {
            id_dict[selected_id[i]] = ""
        }
        selected_id = id_dict;
        this.state["selected_id"] = []
        for(let key in selected_id) {
            this.state["selected_id"].push(parseInt(key))
        }
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