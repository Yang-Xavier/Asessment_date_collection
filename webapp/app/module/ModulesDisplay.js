import $ from "jquery"
import route from 'riot-route'

import BaseNode from "../util/BaseNode"

class ModulesDisplay extends BaseNode{
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
        *           capacity:
        *           lecturer:
        *           }
        *           filled: // for shown the status of form
        *
        *       }
        *   ],
        *   selectable:
        *   selected_items:[id1,id2,id3]
        *
        * }*/

        this.set_state({
            modules: !param.modules?this.get_all_modules():this.get_forms(param)
        })


        this.set_state({selected_module: []});

        this.container = $("<div class='modules_container'/>");
        this.items = $("<div class='items_container'/>");
        this.all_items = [];


        const item = (module, index) => {
            const init_state = Object.assign(module, {
                index: index,
                selected: this.state['selected_items']? (module.id in this.state['selected_items']) : false,
                selectable: this.state['selectable'],
                select_callback: (id, status) => {this.select_item(id, status)}
            });

            return new ModuleItem(init_state)
        };

        if (this.state["selectable"]) {
            this.items.append($("<div class='item title'><span>Module Code</span><span>Module Name</span><span>Module Semester</span><span>Module Lecturer</span></div>")) //add title
        } else {
            this.items.append($("<div class='item title'><span>Module Code</span><span>Module Name</span><span>Module Semester</span><span>Module Lecturer</span><span>Filled</span></div>")) //add title
        }
        for(let i in this.state['modules']) {
            const item_ = item(this.state['modules'][i],i);
            this.all_items.push(item_);
            this.items.append(item_.render())
        }
    }

    select_item(id, status) {
        if(status){
            this.state['selected_items'].push(id)
        } else {
            delete this.state['selected_items'][this.state['selected_items'].indexOf(id)]
        }
    }

    select_all() {
        this.state["selected_items"]=[];
        for(let i in this.all_items) {
            this.all_items[i].select(true);
        }
    }

    get_all_modules() {
        let modules = [];

        for(let i in window.global.modules) {
            const module = {}
            module['id'] = window.global.modules[i].id;
            module['name'] = window.global.modules[i].name;
            module['code'] = window.global.modules[i].code;
            module['selected'] = false;

            module['details'] = {};
            module['details']['capacity'] = window.global.modules[i].students.length;
            module['details']['lecturer'] = window.global.modules[i].academic_name;
            module['details']['semester'] = window.global.modules[i].semester;

            modules.push(module)

        }

        return modules


    }

    get_forms(param) {
        if(param["no_process"]) {
            return param.modules
        }

        let modules = [];
        for(let i in param.modules) {
            const module = {};
            module['id'] = param.modules[i].form_id;
            module['name'] = param.modules[i].module.name;
            module['code'] = param.modules[i].module.code;
            module['filled'] = param.modules[i].filled;

            module['details'] = {};
            module['details']['capacity'] = param.modules[i].module.students.length;
            module['details']['lecturer'] = param.modules[i].module.academic_name;
            module['details']['semester'] = param.modules[i].module.semester;

            modules.push(module)

        }




        return modules
    }


    render() {
        this.container.append(this.items);

        return this.container
    }
}

class ModuleItem extends BaseNode{
    constructor(param) {
        super(param);
        /*{
        *           id: // for module or form
        *           name:
        *           code:
        *           details: {
        *               capacity:
            *           lecturer:
            *           }
        *           status: // for shown the status of form
            *       index:
            *       selected:
            *       selectable:
            *       select_callback:
        *  }
        **/

        this.container = $("<div class='item'/>");

        this.container.append($("<span> " + this.state["code"] + " </span>"));
        this.container.append($("<span> " + this.state["name"] + " </span>"));
        this.container.append($("<span> " + this.state["details"]["semester"] + " </span>"));
        this.container.append($("<span> " + this.state["details"]["lecturer"] + " </span>"));


        if (!this.state["selectable"]) {
            const  status_block = $("<span class='status'>"+(this.state['filled']?"<i class= 'fa fa-check' />":"")+"</span>");
            this.container.append(status_block);
            if (this.state['filled']) {
                this.container.on('click', () => {
                    route('/home/form/' + this.state['id'])
                })
            }
        } else {
            this.container.addClass('selectable');
            this.container.addClass(this.state['selected']?'selected': '');
            this.container.on('click', ()=>{
                this.select();
            })
        }
    }

    select(status) {
        this.set_state({selected: status ? status:!this.state['selected']});
        this.state['select_callback'](this.state['id'], this.state['selected']);
    }

    update() {
        if (this.state['selected'])
            this.container.addClass('selected');
        else
            this.container.removeClass('selected');
    }

    render() {

        return this.container;
    }

}








export default ModulesDisplay;