import $ from "jquery"

import '../../style/form_style.css'
import SingleField from './SingleField'

import BaseNode from "../util/BaseNode"

/*
* Based on bootstrap*/
class EditableForm extends BaseNode{
    constructor(param) {
        // param e.g.
        param = {
            "form_name": "Form Name",
            "username": "Use Name",
            "module_code": "COM6666",
        };

        super(param);

        // states
        this.set_state({
            form_fields:[],
            field_counter: 0
        });


        this.header = $("<div class='header'></div>");
        this.container = $("<div class='form_container'></div>");
        this.buttom_btn_block = $("<div class='btn_block'></div>");


        this.form_Panel = $("<form role='form'></form>");
        this.submit_btn = $('<button type="button" class="btn btn-secondary submit_btn">Save</button>');
        this.add_more_btn = $('<button type="button" class="btn btn-light add_btn">Add More Assessment</button>')

        this.head_label = $("<label></label>");
        this.head_label.text("Form: " + this.state['form_name']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Academic: " + this.state['username']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Module: " + this.state['module_code']);
        this.header.append(this.head_label);

        const new_field = new SingleField({
            editable:true,
            removable: false,
            title: "Assignment " + (this.state["field_counter"] + 1),
            id: this.state["field_counter"],
            remove_callback: this.remove_field.bind(this)
        });

        this.state["form_fields"].push(new_field);
        this.state["field_counter"]++;

        this.submit_btn.on('click', ()=>{});
        this.add_more_btn.on('click', ()=>{this.add_more()});

    }

    add_more() {
        const new_field = new SingleField({
            editable:true,
            removable: true,
            title: "Assignment " + (this.state["field_counter"] + 1),
            id: this.state["field_counter"],
            remove_callback: this.remove_field.bind(this)
        });
        this.form_Panel.append(new_field.render());
        this.state["form_fields"].push(new_field);
        this.state["field_counter"]++;
    }

    remove_field(id) {
        delete this.state["form_fields"][id];
        this.state["field_counter"]--;
    }

    check() {

    }

    submit() {

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