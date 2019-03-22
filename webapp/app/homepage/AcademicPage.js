import $ from "jquery";

import BaseNode from "../util/BaseNode";
import Header from './Header'
import NavBar from './NavBar'
import {Menu, MenuItem} from "./Menu";

class AcademicPage extends BaseNode{
    constructor(param) {
        super(param);
        this.set_state({
            "history_form": [],
            "new_form": []
        });

        this.header = new Header({
            user_type:'academic', user_name: 'Test'
        });

        this.nav = new NavBar({
            'menus': this.create_menu()
        });
        this.content = $('<div class="content"/>');
        this.container = $('<div class="home_page"/>');
    }

    create_menu() {
        const menus = [];
        const form_items = {
            'title': 'Forms',
            'items': [],
            'icon': 'fa-chevron-circle-down',
        };

        this.submitted_form = new MenuItem({
            'title': 'Submitted Form (' + this.state["history_form"].length + ")",
            'icon': 'fa-file-alt',
            'click_callback': () => {this.check_submitted_form()},
        });


        this.new_form = new MenuItem({
            'title': 'New Form (' + this.state["new_form"].length + ")",
            'icon': 'fa-file-contract',
            'click_callback': () => {this.check_new_form()}
        });

        form_items['items'].push(this.submitted_form);
        form_items['items'].push(this.new_form);

        this.menu = new Menu(form_items);

        menus.push(this.menu);


        return menus;
    }

    check_submitted_form() {
        this.submitted_form.set_state({selected: true});
        this.new_form.set_state({selected: false});

    }

    check_new_form() {
        this.new_form.set_state({selected: true});
        this.submitted_form.set_state({selected: false});

    }


    render() {
        if(this.state["history_form"].length > 0) {
            this.submitted_form.click();
        } else if(this.state["new_form"].length > 0) {
            this.new_form.click();
        }
        this.container.append(this.header.render());
        this.content.append(this.nav.render());
        this.container.append(this.content);
        return this.container;

    }

}


export default AcademicPage;