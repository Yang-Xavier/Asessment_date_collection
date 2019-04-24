import $ from "jquery"
import request from 'superagent'
import route from 'riot-route'
import Holidays from 'date-holidays'

import '../../style/form_style.css'
import SingleField from '../module/SingleField'

import BaseNode from "../util/BaseNode"
import {add_animate} from '../util/node_util'
import {get_format_token} from "../util/cookie_util";
import {API} from "../util/constant";
import {projects_data_parsing,parse_date} from "../util/data_parse_util";
import Popup from '../module/Popup';

/*
* Based on bootstrap*/
class EditableForm extends BaseNode{
    constructor(param) {
        // param e.g.

        param = Object.assign(param, {
            semester1: {"start": "01/07/2019", "end": "01/02/2020", "exam_period": {"start": "02/02/2020", "end": "08/02/2020"}},
            semester2: {"start": "01/03/2020", "end": "01/06/2020", "exam_period": {"start": "02/06/2020", "end": "08/06/2020"}}
        });

        super(param);



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
        const help_btn = $("<span> <i class='fas fa-question-circle'/> </span>");

        this.popup = new Popup((() => {
            const container = $("<div class='inform_semester'/>");
            container.append($("<div>1st Semester Period: " + this.state['semester1']['start'] + " - " + this.state['semester1']['end'] +"</div>"))
            container.append($("<div>1st Semester Examination Period: " + this.state['semester1']['exam_period']['start'] + " - " + this.state['semester1']['exam_period']['end'] +"</div>"))
            container.append($("<div>2nd Semester Period: " + this.state['semester2']['start'] + " - " + this.state['semester2']['end'] +"</div>"))
            container.append($("<div>2nd Semester Examination Period: " + this.state['semester2']['exam_period']['start'] + " - " + this.state['semester2']['exam_period']['end'] +"</div>"))
            container.append($("<div style='color: var(--red)'>N.B. The assessment deadline cannot be set in the weeekends, the holidays, or the exams period (except exams)</div>"))
            return container
        })());
        help_btn.on('click', () => {
            this.popup.popup(500, 200)
        });

        this.semester_selection.append(help_btn);

        this.head_label = $("<label>" + + "</label>");
        this.head_label.text(this.state['form_name']);
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
            remove_callback: this.remove_field.bind(this),
            date_range: (()=>{
                const date= {start: '', end: ''}
                switch (this.state['semester']) {
                    case 'one':
                        date["start"] = parse_date(this.state['semester1']['start'])
                        date["end"] = parse_date(this.state['semester1']['exam_period']['end'])
                        break;
                    case 'two':
                        date["start"] = parse_date(this.state['semester2']['start'])
                        date["end"] = parse_date(this.state['semester2']['exam_period']['end'])
                        break;
                    case 'both':
                        date["start"] = parse_date(this.state['semester1']['start'])
                        date["end"] = parse_date(this.state['semester2']['exam_period']['end'])
                        break;
                }
                return date
            })()
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
            remove_callback: this.remove_field.bind(this),
            date_range: (()=>{
                switch (this.state['semester']) {
                    case 'one':
                        return {
                            start: this.state['semester1']['start'],
                            end: this.state['semester1']['exam_period']['start']
                        };
                    case 'two':
                        return {
                            start: this.state['semester2']['start'],
                            end: this.state['semester2']['exam_period']['start']
                        };
                    case 'both':
                        return {
                            start: this.state['semester1']['start'],
                            end: this.state['semester2']['exam_period']['start']
                        }
                }
            })()
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
            if(field.state['asm_format'].indexOf("exam") > 0) {
                return true
            }
            const date = parse_date(field.state['asm_due']);
            let flag = true;
            let start,end;
            switch (this.state['semester']) {
                case 'one':
                    start = parse_date(this.state['semester1']['exam_period']['start']);
                    if(!(date<start)){flag = false;}
                    break;
                case 'two':
                    start = parse_date(this.state['semester2']['exam_period']['start']);
                    if(!(date<start)) flag = false;
                    break;
                case 'both':
                    start = parse_date(this.state['semester1']['exam_period']['start']);
                    end = parse_date(this.state['semester1']['exam_period']['end']);
                    if(date>start&&date<end) flag = false;
                    start = parse_date(this.state['semester2']['exam_period']['start']);
                    end = parse_date(this.state['semester2']['exam_period']['end']);
                    if(date>start&&date<end) flag = false;
                    break;
            }

            if(!flag) {
                this.popup.popup(500,200);
                add_animate(field.asm_period_field.find('input'),'shake');
                field.asm_period_field.find('input').css({"border": "1px solid red"});
            } else {
                field.asm_period_field.find('input').css({"border": "1px solid ced4da"});
            }
            return flag
        };

        const check_holiday = (field) => {
            const hd = new Holidays();
            hd.init("GB", "ENG", "no", {});
            const due = parse_date(field.state['asm_due']);

            if(hd.isHoliday(due) || due.getDay() == 6 || due.getDay() == 0){
                this.popup.popup(500,200);
                add_animate(field.asm_period_field.find('input'),'shake');
                field.asm_period_field.find('input').css({"border": "1px solid red"});
                return false
            }else {
                field.asm_period_field.find('input').css({"border": "1px solid ced4da"});
            }



            return true
        };

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
            if(!check_exam_period(this.state['form_fields'][i])) return false;
            if(!check_holiday(this.state['form_fields'][i])) return false;

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
        });

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