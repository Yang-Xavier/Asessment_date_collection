import $ from "jquery";
import route from 'riot-route'

import BaseNode from "../util/BaseNode";
import {ASM_Format_Options} from "../util/constant";

import '../../style/project_display.css'

class ProjectDisplay extends BaseNode{
    constructor(param) {
        /*
        * param = {
        *   type: 'submitted_form' | 'new_form'
        * }*/
        super(param);
        /*
            * this.state = {
               data: [{
                   form_name:
                   form_submitted_date:
                   form_release_date:
                   form_due:
                   editable:
                   form_content: [{
                       "asm_format": "",
                        "asm_name": "",
                        "asm_per": "",
                        "asm_release": "",
                        "asm_due": ""
                   }, {}]
               },{}],

             }
            * */

        this.set_state({
            data: this.request_form(param)
        });

        this.container = $("<div class='form_display'></div>");
        this.display_blocks = [];

        for(let j =0; j<=3;j++)
            for( let i in this.state['data']) {
                this.display_blocks.push(new DisplayBlock(this.state['data'][i]));
            }
    }

    request_form(param) {
        // do request here

        // mock data
        const data = [{
            form_id: "123",
            form_name: "Test Test Test Test Test Test Test Test Test Test Test Test",
            form_submitted_date: "00/00/0000",
            form_release_date: "00/00/0000",
            form_due: "00/00/0000",
            editable: false,
            form_content: [{
                "asm_format": "Mole quize",
                "asm_name": "Test",
                "asm_per": "100",
                "asm_release": "00/00/0000",
                "asm_due": "00/00/0000" }
            ]
        }]

        return data;


    }

    render() {
        for( let i in this.display_blocks) {
            this.container.append(this.display_blocks[i].render());
        }

        return this.container;
    }
}

class DisplayBlock extends BaseNode{
    constructor(param) {
        /*
        * para = {
        *  form_id:
           form_name:
           form_submitted_date:
           form_release_date:
           form_due:
           editable:
           form_content: [{
               "asm_format": "",
                "asm_name": "",
                "asm_per": "",
                "asm_release": "",
                "asm_due": ""
           }]*/
        super(param);

        this.container = $("<div class='display_container'/>");

        this.pre_view_block = $("<div class='pre_view_small'><img/></div>");
        this.due_block = $("<div class='due'>Due: " + this.state["form_due"] + "</div>");
        this.form_name_blcok = $("<div class='form_name'>" + this.state["form_name"] + "</div>");
        this.information_block = $("<div class='information_block'></div>");

        this.container.on('click', () => {
            const r = route.create()
            r('form/'+ this.state["form_id"]
            )})
    }


    render() {

        this.information_block.append(this.form_name_blcok);
        this.information_block.append(this.due_block);

        this.container.append(this.pre_view_block);
        this.container.append(this.information_block);

        return this.container;
    }
}

export default ProjectDisplay;