import $ from "jquery";

import HomePageBased from "../util/HomePageBased";
import Header from './Header'
import NavBar from './NavBar'
import {Menu, MenuItem} from "./Menu";
import route from "riot-route";

class TutorPage extends HomePageBased{
    constructor(param) {
        super(param);

        this.header = new Header({
            user_type: this.state['user_type'],
            user_name: this.state['user_name'],
            login_out_callback: () => {
                route('login')
            }
        });

        this.nav = new NavBar({
            'menus': this.create_menu()
        });

        this.nav_content = $('<div class="content"/>');
        this.content_block = $('<div class="content_block"/>');
        this.container = $('<div class="home_page"/>');
    }

    create_menu() {
        const menus = [];
        const form_items = {
            'title': 'Projects',
            'items': [],
            'icon': 'fa-chevron-circle-down',
        };
        this.menu_items = [];

        this.menu_items.push(new MenuItem({
            'title': 'Visualizable',
            'icon': 'fa-clipboard-check',
            'click_callback': (id) => {
                this.select_nav(id);
                route("/home/projects/visualizable")
            },
            'id': "visualizable"
        }));

        for(let i in this.menu_items) {
            form_items['items'].push(this.menu_items[i])
        }

        this.menu = new Menu(form_items);

        menus.push(this.menu);
        return menus;
    }

    select_nav(status) {
        this.set_state({status: status})
    }

    update() {
        for(let i in this.menu_items) {
            if(this.state["status"] == this.menu_items[i].state["id"]) {
                this.menu_items[i].set_state({selected: true})
            } else {
                this.menu_items[i].set_state({selected: false})
            }
        }
    }


    render() {

        this.container.append(this.header.render());
        this.nav_content.append(this.nav.render());
        this.nav_content.append(this.content_block);
        this.container.append(this.nav_content);
        return this.container;

    }

}


export default TutorPage;