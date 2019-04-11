import $ from "jquery";
import route from 'riot-route'

import BaseNode from "../util/BaseNode";


import '../../style/project_display.css'

class FormsDisplay extends BaseNode{
    constructor(param) {

        super(param);
        /*
            * this.state = {
               data: [{
                   form_name:

                   form_submitted_date:
                   form_release_date:
                   form_due:
                   editable:
                   assessments: [{
                       "asm_format": "",
                        "asm_name": "",
                        "asm_per": "",
                        "asm_release": "",
                        "asm_due": "",
                        "id":
                   }, {}]
               },{}],

             }
            * */
        this.container = $("<div class='form_display'></div>");
        this.display_blocks = [];

        for( let i in this.state['data']) {
            this.display_blocks.push(new DisplayBlock(this.state['data'][i]));
        }
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
        *  id:  //
           form_name:
           form_submitted_date:
           form_release_date:
           form_due:
           editable:
           assessments: [{
               "asm_format": "",
                "asm_name": "",
                "asm_per": "",
                "asm_release": "",
                "asm_due": ""
           }]*/
        super(param);

        this.container = $("<div class='display_container'/>");

        this.due_block = $("<div class='due'>Due: " + this.state["form_due"] + "</div>");
        this.module_block = $("<div class='due'>Module: " + this.state["module"] + "</div>");
        this.submitted_block = $("<div class='due'>Last submission: " + this.state["form_submitted_date"] + "</div>");
        this.form_name_blcok = $("<div class='form_name'>" + this.state["form_name"] + "</div>");
        this.information_block = $("<div class='information_block'></div>");

        this.container.on('click', () => {
            route('home/form/'+ this.state["id"])})
    }


    render() {

        this.information_block.append(this.form_name_blcok);
        this.information_block.append(this.due_block);
        this.information_block.append(this.module_block);
        if (this.state["form_submitted_date"])
            this.information_block.append(this.submitted_block);

        this.container.append(this.information_block);

        return this.container;
    }
}

export default FormsDisplay;