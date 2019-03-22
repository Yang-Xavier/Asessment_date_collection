import $ from "jquery";
import BaseNode from "../util/BaseNode";

class Menu extends BaseNode{
    constructor(param) {
        super(param);
        /*
        param = {
            items: [item1,item2],
            title: '',
            icon:
        }
        * */

        this.items = $('<div class="items_container"/>');
        this.title = $('<div class="menu_title"> <i class="fas ' + this.state['icon'] +'"/><span>' + this.state['title'] + '</span></div>');
        this.container = $('<div class="menu"/>');

    }

    render() {
        if(this.state['items']) {
            for(let i in this.state['items']) {
                this.items.append(this.state['items'][i].render())
            }
        }

        this.container.append(this.title);
        this.container.append(this.items);

        return this.container;
    }
}

class MenuItem extends BaseNode{
    constructor(param) {
        /*
        * param = {
        *   title:
        *   icon:
        *   click_callback: ()=>{}
        *   selected:
        * }
        * */
        super(param);
        this.container = $('<div class="menu_item"><i class="fas ' + this.state['icon'] + '"/><span>' + this.state['title'] +'</span></div>');
        this.container.on('click', () => {this.click()})
    }

    click() {
        this.state['click_callback']()
    }

    update() {
        if(this.state['selected']) {
            this.container.css({
                "color" : '#2874A6',
                "background": '#D6EAF8',
                "box-shadow": "1px 2px 2px #999"
            })
        } else {
            this.container.attr('style', '');
        }
    }

    render() {


        return this.container;
    }
}

export {Menu, MenuItem}