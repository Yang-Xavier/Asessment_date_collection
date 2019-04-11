import $ from "jquery"
import request from 'superagent'
import route from 'riot-route'

import '../../style/form_style.css'
import SingleField from './SingleField'

import BaseNode from "../util/BaseNode"
import {add_animate} from '../util/node_util'
import {get_format_token} from "../util/cookie_util";
import {API} from "../util/constant";
import {projects_data_parsing} from "../util/data_parse_util";

/*
* Based on bootstrap*/
class EditableForm extends BaseNode{
    constructor(param) {
        // param e.g.

        super(param);

        // param = {}

        // states
        this.set_state({
            form_fields:[],
            field_counter: 0,
            editable: true
        });




        this.header = $("<div class='header'></div>");
        this.container = $("<div class='form_container'></div>");
        this.buttom_btn_block = $("<div class='btn_block'></div>");


        this.form_Panel = $("<form role='form'></form>");
        this.submit_btn = $('<button type="button" class="btn btn-secondary submit_btn">Save</button>');
        this.add_more_btn = $('<button type="button" class="btn btn-light add_btn">Add More Assessment</button>')

        this.semester_selection = $("<label>" + "Semester: " + this.state["semester"] + "</label>");


        this.head_label = $("<label></label>");
        this.head_label.text("Project: " + this.state['form_name']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Academic: " + this.state['username']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Module: " + this.state['module_code']);
        this.header.append(this.head_label);
        this.header.append(this.semester_selection);

        const init_state_single_form = {
            editable: this.state['editable'],
            removable: false,
            title: "Assignment ",
            index: this.state["field_counter"],
            remove_callback: this.remove_field.bind(this)
        };
        if (this.state['form_data'].length > 0) {
            const state = Object.assign(init_state_single_form, this.state['form_data'][0]);
            const new_field = new SingleField(state);
            this.state["form_fields"].push(new_field);
            this.state["field_counter"]++;

            for(let i = 1; i < this.state['form_data'].length; i++) {
                init_state_single_form.removable = true;
                init_state_single_form.index = i;

                const state = Object.assign(init_state_single_form,this.state['form_data'][i]);
                const new_field = new SingleField(state);
                this.state["form_fields"].push(new_field);
                this.state["field_counter"]++;
            }

        } else {
            // init_state_single_form.removable = false;
            const new_field = new SingleField(init_state_single_form);
            this.state["form_fields"].push(new_field);
            this.state["field_counter"]++;
        }

        this.submit_btn.on('click', ()=>{this.save()});
        this.add_more_btn.on('click', ()=>{this.add_more()});
    }

    add_more() {
        const new_field = new SingleField({
            editable:true,
            removable: true,
            title: "Assignment ",
            index: this.state["field_counter"],
            remove_callback: this.remove_field.bind(this)
        });
        this.form_Panel.append(new_field.render());
        this.state["form_fields"].push(new_field);
        this.state["field_counter"]++;
    }

    remove_field(index) {
        this.state["form_fields"] = this.state["form_fields"]
            .slice(0,index)
            .concat(this.state["form_fields"].slice(index+1));
        this.state["field_counter"]--;
        for(let i in this.state["form_fields"]) {
            this.state["form_fields"][i].set_state({'index': parseInt(i)});
        }

    }

    check() {
        let per = 0;

        const check_empty = (field) => {
            if(field.state['asm_name'] == "") {
                field.asm_name_field.find('input').css({"border": "1px solid red"});
                add_animate(field.asm_name_field.find('input'),'shake');
                alert("Please enter the name of the assessment");
                return false
            } else {
                field.asm_name_field.find('input').css({"border": "1px solid #ced4da"})
            }
            if(field.state['asm_per'] == 0) {
                field.asm_per_field.find('input').css({"border": "1px solid red"});
                add_animate(field.asm_per_field.find('input'),'shake');
                alert("Please enter the percentage of the assessment");
                return false
            } else {
                field.asm_name_field.find('input').css({"border": "1px solid #ced4da"})
            }
            return true
        };

        const check_exam_period = (field) => {
            return true
        };
        const check_holiday = (field) => {
            return true
        };
        const check_academic_year = (field) => {
            return true
        };  // assessment in two semesters or just on

        const check_sumup = (fields, percentage) => {
            if(percentage == 100) {
                for(let i in fields) {
                    fields[i].asm_per_field.find('input').css({"border": "1px solid #ced4da"})
                }
                return true
            } else {
                for(let i in fields) {
                    fields[i].asm_per_field.find('input').css({"border": "1px solid red"})
                    add_animate(fields[i].asm_per_field.find('input'), 'shake')
                }
                alert("The percentage of assessment should be summed up to 100%");
                return false
            }
        };

        for(let i in this.state['form_fields']) {
            if(!check_empty(this.state['form_fields'][i])) return false;
            per += parseInt(this.state['form_fields'][i].state['asm_per']);
        }

        if(!check_sumup(this.state['form_fields'], per)) return false;

        return true
    }

    save(){
        if(this.check()){
            this.submit()
        }
        else{
            console.log("Not submit")
        }
    }
    submit() {
        const data = {
            forms: [],
        };

        const items = [];
        for(let i in this.state['form_fields']) {
            const item ={};
            item['asm_format'] =  this.state['form_fields'][i].state['asm_format'];
            item['asm_name'] = this.state['form_fields'][i].state['asm_name'];
            item['asm_per'] = this.state['form_fields'][i].state['asm_per'];
            item['asm_release'] = this.state['form_fields'][i].state['asm_release'];
            item['asm_due'] = this.state['form_fields'][i].state['asm_due'];
            items.push(item)
        }
        data.forms.push({
            id: this.state["id"],
            assessments: items
        })

        request
            .post(API.form)
            .set("Authorization", get_format_token())
            .send(data)
            .then((data)=>{
                return request
                    .get(API.project)
                    .set("Authorization", get_format_token())
                    .then((data)=>{
                        window.global.projects = projects_data_parsing(data.body.projects);
                    },()=>route('login'))
            },()=>route('login'))
            .then(()=>{
                route('home/forms/new')
            })

    }

    render() {

        this.buttom_btn_block.append(this.submit_btn);
        this.buttom_btn_block.append(this.add_more_btn);

        for(let i in this.state.form_fields) {
            this.form_Panel.append(this.state.form_fields[i].render());
        }

        this.container.append(this.header);
        this.container.append(this.form_Panel);
        this.container.append(this.buttom_btn_block);

        return this.container;
    }

}

export default EditableForm;