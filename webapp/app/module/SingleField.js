import $ from "jquery"
import '../lib/DateRangePicker';

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
        const init_state = {
            "asm_format": ASM_Format_Options[0],
            "asm_name": "",
            "asm_per": "",
            "asm_release": "",
            "asm_due": "",
            "id": 0,
            "index":0,
            "editable": true
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
            field.attr("disabled", !this.state['editable']);
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
            field.attr("disabled", !this.state['editable']);
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
            field.attr("disabled", !this.state['editable']);
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
            const field = $("<input class='form-control dropup' />");
            const separator = ' - '
            if (this.state['asm_release'].length != 0 && this.state['asm_due'].length != 0)
                field.val(this.state['asm_release'] + separator + this.state['asm_due']);
            field.attr("disabled", !this.state['editable']);
            label.text(Form_Field_Title["asm_period"]);
            if(this.state['editable']) {
                field.daterangepicker({
                        locale: {
                            format: "DD/MM/YYYY"
                        },
                        startDate: this.state["asm_release"]? this.state["asm_release"]: new Date(),
                        endDate: this.state["asm_due"]? this.state["asm_due"]: new Date(),
                        // maxDate:"",
                        // minDate:""
                    },
                    (start, end, label) => {
                        this.state["asm_release"] = start.format("DD/MM/YYYY");
                        this.state["asm_due"] = end.format("DD/MM/YYYY");
                    })
            }


            group.append(label);
            group.append(field);
            return group
        })();



        this.divided_line = $("<div class='divide_line'>"+ this.state["title"]+ (this.state["index"]+1) +"</div>");
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
            if (this.state["remove_callback"]){
                this.state["remove_callback"](this.state["index"]);
            }
            this.asm_period_field.find('input').data('daterangepicker').remove();
            this.container.remove();
        })

    }

    // update(){
    //     this.divided_line.html(this.state["title"] + (this.state["index"]+1));
    // }

    render() {
        if (this.state["title"]){
            this.left_block.append(this.divided_line);
        }

        this.left_block.append(this.asm_format_field);
        this.left_block.append(this.asm_name_field);
        this.left_block.append(this.asm_per_field);
        this.left_block.append(this.asm_period_field);

        if(this.state["removable"] && this.state["editable"]) {
            this.right_block.append(this.remove_block);
        }

        this.container.append(this.left_block);
        this.container.append(this.right_block);

        return this.container;
    }


}

export default SingleField