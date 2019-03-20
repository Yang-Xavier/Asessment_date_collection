import $ from "jquery"

import BaseNode from "../util/BaseNode"

import {Form_Field_Title, ASM_Format_Options} from "../util/constant"

class SingleField extends BaseNode{
    constructor(param) {
        /*
        * param = {
        *   editable:
        *   inform:
        * }*/
        super();

        this.setState({
            "asm_format": "",
            "asm_name": "",
            "asm_per": "",
            "asm_release": "",
            "asm_due": ""
        });

        this.asm_format_field = (() => {
            const group = $("<div class='form-group'></div>");
            const label = $("<label></label>");
            const field = $("<select class='form-control'></select>");

            for (let k in ASM_Format_Options) {
                field.append($("<option>" + ASM_Format_Options[k] + "</option>"))
            }

            label.text(Form_Field_Title["asm_format"]);

            group.append(label);
            group.append(field);
            return group
        })();
        this.asm_name_field = (() => {
            const group = $("<div class='form-group'></div>");
            const label = $("<label></label>");
            const field = $("<input class='form-control' type='text'/>");

            field.on('change',() => {
                this.state["asm_name"] = field.val()
            });

            label.text(Form_Field_Title["asm_name"]);

            group.append(label);
            group.append(field);
            return group
        })();
        this.asm_per_field = (() =>{
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
        })();
        this.asm_period_field = (() =>{
            const group = $("<div class='form-group'></div>");
            const label = $("<label></label>");
            const field = $("<input class='form-control' />");

            label.text(Form_Field_Title["asm_period"]);

            group.append(label);
            group.append(field);
            return group
        })();

        this.container = $('<div></div>');

    }

    render() {
        this.container.append(this.asm_format_field);
        this.container.append(this.asm_name_field);
        this.container.append(this.asm_per_field);
        this.container.append(this.asm_period_field);
    }


}

export default SingleField