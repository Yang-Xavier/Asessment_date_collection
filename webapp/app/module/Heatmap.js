import $ from "jquery";



import CalHeatMap from 'cal-heatmap'
import 'cal-heatmap/cal-heatmap.css'

import BaseNode from "../util/BaseNode";

class HeatMap extends BaseNode{
    constructor(param) {
        /*
        * param = {
        *   data:
        *   name:
        *   title:
        * }
        * */
        super(param);



        this.container = $("<div class='heatmap_container'/>");

        this.heatmap_node = $("<div class='heatmap'/>");
        this.title = $("<div class='title'/>");
        this.title.text(this.state['title']);

        this.heatmap = this.init_heatmap(this.heatmap_node)
    }

    init_heatmap(node) {
        let heatmap = new CalHeatMap();
        heatmap.init({
            itemSelector: node[0],
            domain: 'month',
            subDomain: 'day',
            subDomainTextFormat: "%d",
            cellSize: '24',

            weekStartOnMonday: false,

            domainGutter: 10,
            domainMargin: 10,
            range: 6,
            animationDuration: 200,

            itemName: this.state["name"],
            legend: this.state["legend"],
            legendVerticalPosition: 'bottom',
            legendHorizontalPosition:'center',
            tooltip: true,
            subDomainTitleFormat: {
                empty: "{date}",
                filled: "{count} {name} {connector} {date}"
            },

            start: this.state["start"],
            end: this.state["end"],
            minDate: this.state["start"],
            maxDate: this.state["end"],

            onClick: (date, item)=> this.onClick(date, item)
        });

        return heatmap
    }

    next(n) {
        this.heatmap.next(n);
    }

    previous(n){
        this.heatmap.previous(n);
    }

    onClick(date, item) {
        this.heatmap.highlight(date);
        // console.log(this.heatmap)
    }

    update() {
        this.heatmap.update(this.state["data"]);
        this.heatmap.options.data = this.state["data"]
    }

    render() {


        this.container.append(this.title);
        this.container.append(this.heatmap_node)
        return this.container
    }

}

export default HeatMap;