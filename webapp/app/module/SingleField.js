import $ from "jquery"

import BaseNode from "../util/BaseNode"

import {Form_Field_Title, ASM_Format_Options} from "../util/constant"
import {add_animate} from "../util/node_util";

class SingleField extends BaseNode{
    constructor(param) {
        /*
        * param = {
        *   editable:
        *   inform:[]
        *   removable:
        *   title:
        *   id:
        *   remove_callback
        * }*/
        super(param);

        this.set_state({
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

        this.divided_line = $("<div class='divide_line'>"+ this.state["title"] +"</div>");
        this.remove_block = $("<div class='remove_block '><i class='fas fa-times-circle'/></div>");

        this.left_block = $('<div class="left"></div>');
        this.right_block = $('<div class="right"></div>');

        this.container = $('<div class="form_field"></div>');


        this.remove_block.on('click', () => {this.remove()});
        this.container.on('mouseenter', () => {this.remove_block.css({"display": "block"});});
        this.container.on('mouseleave', () => {this.remove_block.css({"display": "none"});});
        this.remove_block.on('mouseenter', () => {this.container.css({"background": "#eee"});});
        this.remove_block.on('mouseleave', () => {this.container.css({"background": "none"});});

    }

    remove() {
        this.container.remove();
        this.state["remove_callback"](this.state["id"]);
    }

    render() {
        if (this.state["title"]){
            this.left_block.append(this.divided_line);
        }

        this.left_block.append(this.asm_format_field);
        this.left_block.append(this.asm_name_field);
        this.left_block.append(this.asm_per_field);
        this.left_block.append(this.asm_period_field);

        if(this.state["removable"]) {
            this.right_block.append(this.remove_block);
        }

        this.container.append(this.left_block);
        this.container.append(this.right_block);

        return this.container;
    }


}

export default SingleField