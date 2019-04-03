import "jquery"

import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/ui/widgets/datepicker';

import BaseNode from "../util/BaseNode"

import ModulesDisplay from'./ModulesDisplay'
import Popup from './Popup'

import '../../style/project_style.css'

class ProjectCreate extends BaseNode{
    constructor(param) {
        super(param);

        this.set_state({
            'project_name': '',
            'project_due': '',
            'selected_modules': [{id:'', name:'', code:'', details:''}],
            'selected_id': []
        });

        this.container = $('<div class="project_create"/>');
        this.header = (() => {
            const container = $('<div class="header form-group"/>');

            const name_block = $('<div class="name_block form-control"><label>Project Name</label></div>');
            const name = $('<input type="text"/>');

            const time_block = $('<div class="time_block form-control"><label>Collection Date</label></div>');
            const time = $('<input />');

            const module_selection_btn = $("<button class='form-control'><i/>Select Modules</button>");
            const save_btn = $("<button class='form-control'><i/>Save and Send</button>");

            name.on('change', () => {
               this.state['project_name'] = name.val();
            });

            module_selection_btn.on('click', () => {
                this.open_modules_selection()
            });

            // time picker
            time.datepicker();

            name_block.append(name);
            time_block.append(time);

            container.append(name_block);
            container.append(time_block);

            container.append(module_selection_btn);
            container.append(save_btn);

            return container
        })();

    }

    open_modules_selection() {
        const container = $("<div class='modules_block'/>");
        const module_selection = new ModulesDisplay({'selectable': true, 'selected_items': this.state['selected_id']});
        const select_all = $("<div class='select_all_btn'>All</div>");
        const close = $("<div class='close_btn'><i class='fas fa-check-circle'></i></div>");
        close.on('click', () => {
            this.module_selection.close();
        });

        select_all.on('click', () => {
            module_selection.select_all(true);
        });

        container.append(module_selection.render());


        this.module_selection = new Popup(container);

        this.module_selection.add_appendix_to_content(select_all);
        this.module_selection.add_appendix_to_content(close);

        this.module_selection.set_on_close(() => {
            this.state["selected_id"] = module_selection.state['selected_items'];
            // console.log(this.state["selected_id"])
        });



        this.module_selection.popup(700,700)
    }

    select_module() {

    }


    render() {

        this.container.append(this.header);
        this.container.append(this.module_selection_btn);
        // this.container.append(this.module_selection);

        return this.container;
    }

}

export default ProjectCreate;