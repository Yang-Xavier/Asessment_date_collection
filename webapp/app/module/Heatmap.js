import $ from "jquery";



import CalHeatMap from 'cal-heatmap'
import 'cal-heatmap/cal-heatmap.css'
import '../../style/visualisation_page.css'

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
        this.heatmap_node = $("<div class='heatmap'/>");

        this.heatmap = this.init_heatmap(this.heatmap_node)
    }

    init_heatmap(node) {
        let heatmap = new CalHeatMap();
        heatmap.init({
            itemSelector: node[0],
            domain: 'month',
            subDomain: 'day',
            subDomainTextFormat: "%d",
            cellSize: '20',
            tooltip: true,
            weekStartOnMonday: false,

            domainGutter: 10,
            domainMargin: 10,
            range: 5,

            legend: [10, 20, 30, 40],
            legendVerticalPosition: 'bottom',
            legendHorizontalPosition:'center',
            legendMargin: [0, 0, 20, ],

            // start: new Date(2000, 0, 15),
            // minDate: new Date(2000, 1),
            // maxDate: new Date(2000, 8),
            // data: {},
            considerMissingDataAsZero:true,


            onClick: (date, item)=> this.onClick(date, item)
        });

        return heatmap
    }

    next(date) {

    }

    previous(date){

    }

    onClick(date, item) {
        this.heatmap.highlight(date);
        // console.log(this.heatmap)
    }

    get_data() {
        // const project = window.global.projects.filter(term => );
        // console.log(window.global.projects)
    }

    render() {


        this.container.append(this.heatmap_node)
        return this.container
    }

}

export default Heatmap;