import $ from "jquery"
import '../../style/popup.css'

class Popup {
    constructor(dom, parent_node){
        this.dom = dom;
        this.parent_node = parent_node? parent_node:$('body');


        this.container = $("<div class='popup_container'></div>");
        this.mask = $("<div class='popup_mask'></div>");
        this.content = $("<div class='popup_content'></div>");


        this.mask.on('click', () => {
            this.close()
        });

        this.content.append(this.dom);
        this.container.append(this.content);
        this.container.append(this.mask);

        this.parent_node.append(this.container);
    }

    set_on_close(fn) {
        this.on_close = fn;
    }

    add_appendix_to_content(appendix_dom) {
        this.content.append(appendix_dom)
    }

    popup(width, height) {
        this.content.css({
            width: width + 'px',
            height: height + 'px'
        })
        this.container.css({
            display: "block"
        });

    }

    destory() {
        this.container.remove();
    }

    close() {
        if(this.on_close) this.on_close();
        this.container.css({
            display: "none"
        });
    }
}


export default Popup;