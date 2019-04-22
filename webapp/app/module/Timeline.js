import $ from "jquery";
import vis from "vis";

import 'vis/dist/vis.min.css';


import BaseNode from "../util/BaseNode"

class Timeline extends BaseNode{
    constructor(param) {
        /*param={
            items:
            groups:
        }*/
        super(param);

        this.set_state({
            "changed_items": []
        });

        this.container = $("<div class='timeline_container'/>");

        this.timeline_block = $("<div id='timeline_block' class='timeline_block'/>");

        // this is a bug of the timeline plugin that is the timeline must be initial after the parent dom is mounted
        const interval_id = setInterval(()=>{
            if($('#timeline_block') && $('.visul_panel.tl').attr('style').indexOf("block") > 0) {
                this.timeline = this.init_timeline(this.timeline_block);
                clearInterval(interval_id)
            }
        }, 10);
    }

    init_timeline(node) {
        const timeline = new vis.Timeline(node[0]);


        let data = this.state['items'];

        timeline.setOptions(this.get_config());
        timeline.redraw();
        timeline.setItems(data);

        timeline.setGroups(this.state["groups"]);

        return timeline
    }

    get_config() {
        const config = {
            format: {
                minorLabels: {
                    weekday:    'ddd D',
                    day:        'D',
                    week:       'w',
                    month:      'MMM',
                    year:       'YYYY'
                },
                majorLabels: {
                    weekday:    'MMMM YYYY',
                    day:        'MMMM YYYY',
                    week:       'MMMM YYYY',
                    month:      'YYYY',
                    year:       ''
                }
            },
            horizontalScroll: true,
            timeAxis: {scale: "day", step: 1},
            onMove: (item, callback) => {
                this.state['changed_items'].push({
                    id: item.id,
                    start: item.start,
                    end:item.end
                });
                this.state["move_callback"](item);
            }
        };

        return Object.assign( config, this.state["config"])
    }


    render() {
        this.container.append(this.timeline_block);

        return this.container;
    }
}

export default Timeline;