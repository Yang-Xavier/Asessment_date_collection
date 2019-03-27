import $ from "jquery";

import BaseNode from "../util/BaseNode";
import Header from './Header'
import NavBar from './NavBar'
import {Menu, MenuItem} from "./Menu";

class TutorPage extends BaseNode{
    constructor(param) {
        super(param);
        this.set_state({
            "heat_form": [],
            "time_line": []
        });

        this.header = new Header({
            user_type:'year tutor', user_name: 'Test'
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
            'title': 'Data View',
            'items': [],
            'icon': 'fa-chevron-circle-down',
        };

        this.heat_map = new MenuItem({
            'title': 'Heat Map (' + this.state["heat_form"].length + ")",
            'icon': 'fas fa-table',
            'click_callback': () => {this.check_heat_map()},
        });


         this.time_line = new MenuItem({
             'title': 'Time Line (' + this.state["time_line"].length + ")",
             'icon': 'far fa-calendar-alt',
             'click_callback': () => {this.check_time_line()}
         });

        form_items['items'].push(this.heat_map);
        form_items['items'].push(this.time_line);

        this.menu = new Menu(form_items);

        menus.push(this.menu);


        return menus;
    }

    check_heat_map() {
        this.heat_map.set_state({selected: true});
        this.time_line.set_state({selected: false});

    }

     check_time_line() {
         this.time_line.set_state({selected: true});
         this.heat_map.set_state({selected: false});

     }


    render() {
        if(this.state["heat_form"].length > 0) {
            this.heat_map.click();
        } else if(this.state["time_line"].length > 0) {
            this.new_form.click();
        }
        this.container.append(this.header.render());
        this.content.append(this.nav.render());
        this.container.append(this.content);
        return this.container;

    }

}


export default TutorPage;