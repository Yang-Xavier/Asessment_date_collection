

class BaseNode {

    constructor() {

        // pre-process the data here and pass ot into state

        this.state = {};  // Used to store the state of the node e.g. text or child node

        // In this part, only create the node, no operation e.g. pass value
    }

    before_render() {
        // used to add animation or request the data
    }



    done_render() {
        // used to add animation
    }

    distory() {

        // used to unmount the node
    }

    update_state(state) {
        // update the state
        // this doesn't need to be overwrite
        this.state = Object.assign(this.state, state); // Update the state
        this.update_node();
    }

    update() {


        // update for node
        // Do all of the logic operation here
        // Once the state has change
        // It's better to mount child node here
    }


    render() {

        // create the child node instance right here
    }

    render_() {

        // inner function, do ont overwrite
        this.before_render();
        this.update();
        const render_node = this.render();
        this.done_render();

        return render_node;
    }

}

export default BaseNode;