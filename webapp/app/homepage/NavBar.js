import $ from "jquery";

import BaseNode from "../util/BaseNode";

class NavBar extends BaseNode{
    constructor(param) {

        super(param);
        /*
        param = {
            header:
            menus: [
                menu1,
                menu2
            ],
            appendix:
        }
        * */

        this.container = $('<div class="nav_bar"/>');

    }

    render() {
        if(this.state['menus']) {
            for(let i in this.state['menus']) {
                this.container.append(this.state['menus'][i].render());
            }
        }


        return this.container;
    }
}

export default NavBar;