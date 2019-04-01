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

        this.due_block = $("<div class='due'>Due: " + this.state["form_due"] + "</div>");
        this.form_name_blcok = $("<div class='form_name'>" + this.state["form_name"] + "</div>");
        this.information_block = $("<div class='information_block'></div>");

        this.container.on('click', () => {
            route('home/form/'+ this.state["form_id"])})
    }


    render() {

        this.information_block.append(this.form_name_blcok);
        this.information_block.append(this.due_block);

        this.container.append(this.information_block);

        return this.container;
    }
}

export default FormsDisplay;