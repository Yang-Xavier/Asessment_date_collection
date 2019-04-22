import $ from "jquery"
import route from 'riot-route'

import BaseNode from "../util/BaseNode"
import ModulesDisplay from "../module/ModulesDisplay";

import "../../style/project_detail.css"


class ProjectDetails extends BaseNode{
    constructor(param) {
        super(param);
        /*
        * param = {
        *   modules: [
        *       {
        *           id: // for module or form
        *           name:
        *           code:
        *           details: {
        *               capacity:
        *               lecturer:
        *           }
        *           filled: // for shown the status of form
        *
        *           }
        *       ],
        *
        *   project_name:
        *   project_due:
        *   status:
        *   state: 'done', 'pending'
        * }
        * */

        this.container = $("<div class='project_detail'></div>");

        this.header = (() => {

            const header = $("<div class='header'/>");
            const project_name = $("<div class='name'>" + this.state["project_name"] + "</div>");
            const due =   $("<div class='status'> <span>Deadline: " + this.state["project_due"] + "</span></div>");
            const status = $("<span><span> Status: " + this.state["status"] + "</span></span>");

            const visual_sellection = $("<div class='visual_selection'><div class='v_icon'>V</div><i class='eye_icon fas fa-eye'/></div>");
            const visual_btn = $("<div class='visual_btn '>Visualization</div>");

            const notify_btn = $("<div class='notify_btn' ><div class='icon'><i class='fas fa-bell'/></div><div class='text'>Notify</div></div>");
            const function_block = $("<div class='function_block'/>");

            visual_btn.on('click', () => {
                route('visualisation/'+this.state['project_id']);
            })

            if(this.state["done"] || this.state['checking']) {
                status.append($("<i class='done fas fa-check-circle'/>"));
                visual_sellection.append(visual_btn);
                function_block.append(visual_sellection);
            } else {
                function_block.append(notify_btn);
            }

            due.append(status);
            header.append(project_name);
            header.append(due);
            header.append(function_block);

            return header;
        })();

        this.forms = (() =>{
            const container = $("<div class='forms'/>");
            const param = {selectable:false, modules: this.state['modules']};

            const modules_display = new ModulesDisplay(param);

            container.append(modules_display.render());
            return container
        })();
 }

 render() {


     this.container.append(this.header);
     this.container.append(this.forms);

     return this.container
 }

}

export default ProjectDetails