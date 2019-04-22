import $ from "jquery";
import route from 'riot-route'

import BaseNode from "../util/BaseNode";

class ProjectDisplay extends BaseNode{
    constructor(param) {
        super(param);
        /*
            * this.state = {
               data: [{
                   project_name:
                   project_submitted_date:
                   project_release:
                   project_due:
               },{}],
             }
            * */
        this.container = $("<div class='project_display'></div>");
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
        *  project_name:
           project_submitted_date:
           project_create:
           project_due:

           status:
           checking:
           done:
           pending:
           }*/
        super(param);

        this.container = $("<div class='display_container'/>");

        this.due_block = $("<div class='due'>Due: " + this.state["project_due"] + "</div>");
        this.release_block = $("<div class='release'>Create: " + this.state["project_create"] + "</div>");
        this.project_name_blcok = $("<div class='project_name'>" + this.state["project_name"] + "</div>");
        this.status_block = $("<div class='status'> Progress: " + this.state["status"] + "</div>");
        this.information_block = $("<div class='information_block'></div>");

        this.status_logo = (() => {

            const container = $("<div class='status_logo'></div>");

            if(this.state['done']) {
                container.append($("<i class='fas fa-check-circle done'></i>"));
                container.append($("<i class='fas fa-eye checking'></i>"));
            }
            else
                container.append($("<i class='fas fa-user-edit waiting'></i>"));
            if(this.state['checking'])
                container.append($("<i class='fas fa-eye checking'></i>"));


            return container
        })();


        this.container.on('click', () => {
            route('home/project/'+ this.state["project_id"])})
    }


    render() {

        this.information_block.append(this.project_name_blcok);
        this.information_block.append(this.status_block);
        this.information_block.append(this.release_block);
        this.information_block.append(this.due_block);
        this.information_block.append(this.status_logo);


        this.container.append(this.information_block);
        return this.container;
    }
}

export default ProjectDisplay;