import $ from "jquery"

import BaseNode from "../util/BaseNode"

import {Form_Field_Title, ASM_Format_Options} from "../util/constant"
import '../lib/TimePicker'

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
        const init_state = {
            "asm_format": ASM_Format_Options[0],
            "asm_name": "",
            "asm_per": "",
            "asm_release": "",
            "asm_due": "",
            "editable": false
        };
        param = Object.assign(init_state,param);

        super(param);

        this.asm_format_field = (() => {
            const group = $("<div class='form-group'></div>");
            const label = $("<label></label>");
            const field = $("<select class='form-control'></select>");

            for (let k in ASM_Format_Options) {
                field.append($("<option>" + ASM_Format_Options[k] + "</option>"))
            }
            field.val(this.state['asm_format']);
            field.attr("editable",this.state['editable']);
            label.text(Form_Field_Title["asm_format"]);
            field.on('change', (e) => {
                this.state["asm_format"] = field.val()
            });

            group.append(label);
            group.append(field);
            return group
        })();

        this.asm_name_field = (() => {
            const group = $("<div class='form-group'></div>");
            const label = $("<label></label>");
            const field = $("<input class='form-control' type='text'/>");

            field.val(this.state['asm_name']);
            field.attr("editable",this.state['editable']);
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

            field.val(this.state['asm_per']);
            field.attr("editable",this.state['editable']);
            field.on('change',() => {
                this.state["asm_per"] = field.val()
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
            const separator = '   to   ';
            if (this.state['asm_release'].length != 0 && this.state['asm_due'].length != 0)
                field.val(this.state['asm_release'] + separator + this.state['asm_due']);
            field.attr("editable",this.state['editable']);
            field.attr("editable",this.state['editable']);
            label.text(Form_Field_Title["asm_period"]);

            field
                .dateRangePicker({
                    format: 'DD/MM/YYYY',
                    separator: separator,})
                .bind('datepicker-change',(event,obj) => {
                    const value = obj.value.split(separator);

                    this.state["asm_release"] = value[0];
                    this.state["asm_due"] = value[1];

                });

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
        add_animate(this.container, 'zoomOut', () => {
            this.state["remove_callback"](this.state["id"]);
            this.asm_period_field.find('input').data('dateRangePicker').destroy();
            this.container.remove();
        })

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