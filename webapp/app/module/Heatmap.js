import $ from "jquery";



import CalHeatMap from 'cal-heatmap'

import BaseNode from "../util/BaseNode";

class Heatmap extends BaseNode{
    constructor(param) {
        /*
        * param = {
        *   project_id:
        * }
        * */
        param = {
            project_id: 0
        }
        super(param);


        this.container = $("<div class='heatmap_container'/>");

        this.set_state({
            data: this.get_data()
        })


    }

    init_heatmap(node) {
        let heatmap = new CalHeatMap();
        heatmap.init({
            id: node.get(0),

        })
    }

    get_data() {
        const project = window.global.projects.filter(term);
        console.log(window.global.projects)
    }

    render() {
        return this.container
    }

}

export default Heatmap;