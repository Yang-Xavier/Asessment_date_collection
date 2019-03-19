import $ from "jquery"

import '../../style/form_style.css'

import BaseNode from "../util/BaseNode"
import {add_animate} from "../util/node_util"
import LoginPanel from "../login/LoginPanel";
import {Form_Field_Title, ASM_Format_Options} from "../util/constant"

/*
* Based on bootstrap*/
class EditableForm extends BaseNode{
    constructor(param) {
        // param e.g.
        param = {
            "form_name": "Form Name",
            "username": "Use Name",
            "module_code": "COM6666",
        }

        super();


        this.form_templete = {
            "asm_format":"",
            "asm_name": "",
            "asm_per": "",
            "asm_release": "",
            "asm_due": ""
        };


        // states
        this.state = {
            param: param,
            forms:[this.form_templete]
        };


        let assessment_count = 0;
        this.form_field = {
            "asm_format": ()=>{
                const group = $("<div class='form-group'></div>");
                const label = $("<label></label>");
                const field = $("<select class='form-control'></select>");

                for (let k in ASM_Format_Options) {
                    field.append($("<option>"+ ASM_Format_Options[k] +"</option>"))
                }

                label.text(Form_Field_Title["asm_format"]);

                group.append(label);
                group.append(field);
                return group
            },
            "asm_name": () => {
                const group = $("<div class='form-group'></div>");
                const label = $("<label></label>");
                const field = $("<input class='form-control' type='text'/>");

                field.on('change',() => {
                    this.state.forms[assessment_count]["asm_name"] = field.val()
                });

                label.text(Form_Field_Title["asm_name"]);

                group.append(label);
                group.append(field);
                return group
            },
            "asm_per": () =>{
                const group = $("<div class='form-group '></div>");
                const label = $("<label></label>");
                const field = $("<input class='form-control'  type='number'/>");

                field.on('change',() => {
                    this.state.forms[assessment_count]["asm_per"] = field.val()
                });

                label.text(Form_Field_Title["asm_per"]);

                group.append(label);
                group.append(field);
                return group
            },
            "asm_period":() =>{
                const group = $("<div class='form-group'></div>");
                const label = $("<label></label>");
                const field = $("<input class='form-control' />");

                label.text(Form_Field_Title["asm_period"]);

                group.append(label);
                group.append(field);
                return group
            },
            "add_more": () => {
                const field = $('<button type="button" class="btn btn-light add_btn">Add More Assessment</button>');
                field.on('click', () => {
                    assessment_count++;
                    this.state.forms.push(this.form_templete);
                    this.add_more();
                });

                return field
            }
        };

        this.header = $("<div class='header'></div>");
        this.container = $("<div class='form_container'></div>");
        this.buttom_btn_block = $("<div class='btn_block'></div>");


        this.form_Panel = $("<form role='form'></form>");
        this.submit_btn = $('<button type="button" class="btn btn-secondary submit_btn">Save</button>');

        this.head_label = $("<label></label>");
        this.head_label.text("Form: " + this.state.param['form_name']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Academic: " + this.state.param['username']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Module: " + this.state.param['module_code']);
        this.header.append(this.head_label);

        this.divided_line = () => $("<div class='divide_line'>"+"Assessment "+ (assessment_count+1) +"</div>");
    }

    add_more() {
        this.form_Panel.append(this.divided_line);
        this.form_Panel.append(this.form_field["asm_format"]());
        this.form_Panel.append(this.form_field["asm_name"]());
        this.form_Panel.append(this.form_field["asm_per"]());
        this.form_Panel.append(this.form_field["asm_period"]());
    }

    check() {

    }

    submit(){

    }

    render() {
        this.add_more();


        this.buttom_btn_block.append(this.submit_btn);
        this.buttom_btn_block.append(this.form_field["add_more"]());



        this.container.append(this.header);
        this.container.append(this.form_Panel);
        this.container.append(this.buttom_btn_block);

        return this.container;
    }

}

export default EditableForm;