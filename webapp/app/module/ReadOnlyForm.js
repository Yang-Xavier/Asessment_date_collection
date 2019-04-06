import $ from "jquery"

import '../../style/form_style.css'
import SingleField from './SingleField'

import BaseNode from "../util/BaseNode"
import {add_animate} from '../util/node_util'
import {Semester_Selection} from "../util/constant";

/*
* Based on bootstrap*/
class ReadOnlyForm extends BaseNode{
    constructor(param) {
        // param e.g.
        super(param);

        // states
        this.set_state({
            form_fields:[],
            field_counter: 0,
            editable: false
        });


        this.header = $("<div class='header'></div>");
        this.container = $("<div class='form_container'></div>");
        this.buttom_btn_block = $("<div class='btn_block'></div>");

        this.semester_selection = $("<label>"+"Semester: "+ this.state["semester"] +" </label>");

        this.form_Panel = $("<form role='form'></form>");

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
        };
        if (this.state['form_data'].length > 0) {
            const state = Object.assign(init_state_single_form,this.state['form_data'][0]);
            const new_field = new SingleField(state);
            this.state["form_fields"].push(new_field);
            this.state["field_counter"]++;

            for(let i = 1; i < this.state['form_data'].length; i++) {
                init_state_single_form.index = this.state["field_counter"];
                const state = Object.assign(init_state_single_form,this.state['form_data'][i]);
                const new_field = new SingleField(state);
                this.state["form_fields"].push(new_field);
                this.state["field_counter"] = i;
            }

        } else {
            const new_field = new SingleField(init_state_single_form);
            this.state["form_fields"].push(new_field);
            this.state["field_counter"]++;
        }



    }

    render() {

        for(let i in this.state.form_fields) {
            this.form_Panel.append(this.state.form_fields[i].render());
        }

        this.container.append(this.header);
        this.container.append(this.form_Panel);
        this.container.append(this.buttom_btn_block);

        return this.container;
    }

}

export default ReadOnlyForm;