import $ from 'jquery'
import dateFn from 'date-fns'
import _ from 'lodash'
import moment from "moment"

import BaseNode from "../util/BaseNode"

import HeatMap from '../module/Heatmap'
import Timeline from '../module/Timeline'

import {parse_date} from "../util/data_parse_util";


import '../../style/visualisation_page.css'

class Visualization extends BaseNode{
    constructor(param) {
        // param = {project_id: '', editable: true}
        super(param);
        /**[{
            "asm_id": 1,
            "form_id":2,
            "project_id":3,
            "module_id": 4,
            "asm_format": "",
            "asm_release": "",
            "asm_due": "",
            "asm_name": "",
            "module_code":"",
            "academic":"",
            "run_in":"",
            "students": []
            },{}]
         * */

        this.state = Object.assign(this.state,{
            "current": "",
            "filter_module": {"id": "all"},
            "graph": "timeline",
            "changed_item": [],
            "changed": false,
        }, this.process_data());


        this.container = $("<div class='v_container'/>");

        this.heatmap_panel = $("<div class='visul_panel'/>");
        this.timeline_panel = $("<div class='visul_panel tl'/>");

        this.header = $("<div class='fun_nav'/>");
        this.visual_selection = (()=>{
            const container = $("<div class='visul_btn'/>");
            const heatmap_btn = $("<div class='btn'>HeatMap</div>");
            const timeline_btn = $("<div class='btn'>TimeLine</div>");

            if(this.state['graph'] == 'heatmap') {
                heatmap_btn.addClass("selected")
            }
            if(this.state['graph'] == 'timeline') {
                timeline_btn.addClass("selected")
            }
            container.append(heatmap_btn);
            container.append(timeline_btn);

            heatmap_btn.on('click', () => {
                this.set_state({graph: 'heatmap'});
            });
            timeline_btn.on('click', () => {
                this.set_state({graph: 'timeline'});
            });
            return container
        });

        this.module_seletion = () =>{
            const div = $("<div class='selection_block'/>");
            const options = (() => {
                const selection = $("<select class='selection'/>");
                const op = $("<option _id='all'>All</option>");
                op.attr("_id" , "all");
                selection.append(op);
                _.forEach(this.state['modules'], term => {
                    const item = $("<option>" + term['code'] +  " / " + term["semester"] + "</option>");
                    item.attr("_id" ,term['id']);
                    if(this.state["filter_module"]['id'] == term['id']) {
                        item.attr("selected", true)
                    }
                    selection.append(item);
                });

                selection.on('change', e => {
                    const s_index = selection[0].selectedIndex;
                    const k = $(e.currentTarget[s_index]).attr("_id");
                    this.set_state({
                        filter_module: { "id": k}
                    })
                });
                return selection
            })();

            div.append(options);

            return div
        };
        this.heatmap_nav_btn = () =>{
            const cont = $("<div/>");
            const next_btn = $("<button class='next_btn'>Next</button>");
            const pre_btn = $("<button class='pre_btn'>Previous</button>");

            next_btn.on('click', ()=>{

                if(this.state["date"]>=dateFn.addMonths(this.state["start"],6)){
                    next_btn.addClass("ban")
                } else {
                    this.heatmap_peroid_next();
                    pre_btn.removeClass("ban");
                    next_btn.removeClass("ban")
                }
            });

            pre_btn.on('click', ()=>{

                if(this.state["date"]<=this.state["start"]){
                    pre_btn.addClass("ban")
                } else {
                    this.heatmap_peroid_pre();
                    next_btn.removeClass("ban");
                    pre_btn.removeClass("ban")
                }
            });


            cont.append(pre_btn);
            cont.append(next_btn);
            return cont
        };

        this.timeline_blank_block = () => {
            const div = $("<div class='selection_block'/>");
            return div;
        };
        this.timeline_fn_btn = () => {
            const cont = $("<div/>");
            const reset_btn = $("<button class='next_btn'>Reset</button>");
            const save_btn = $("<button class='pre_btn'>Save</button>");

            cont.append(reset_btn);
            cont.append(save_btn);

            if(!this.state['changed']) {
                reset_btn.addClass("ban");
            }
            if(this.timeline.state['changed_items'].length == 0) {
                save_btn.addClass("ban");
            }

            reset_btn.on("click", () => {
                if(!this.state['changed'])
                    return

                this.timeline.state['changed_items'] = [];
                this.set_state(Object.assign(this.process_data(), {changed: false}));
                this.timeline.timeline.setData(this.timeline_data());


                alert("Reset")
            });

            save_btn.on("click", () => {
                if(this.timeline.state['changed_items'].length == 0)
                    return;

                // filter
                let new_data = [];
                _.forEach(this.timeline.state['changed_items'], term => {
                    new_data = _.forEach(this.state["origin_data"], oterm => {
                        if(term.id == oterm.asm_id) {
                            oterm.asm_release = term.start;
                            oterm.asm_due = term.end;
                        }
                        return oterm
                    })
                });
                this.set_state({"origin_data": new_data});
                this.timeline.state['changed_items'] = [];
                this.set_state({"changed": true})
                alert("Saved");
            });

            return cont;
        };

        this.init();
        this.set_state({
            "filter_module": {"id": "all"},
            "graph": "heatmap"
        })
    }

    init() {

        // init heatmap
        const config_bun = {
            "itemName": ["bunching", "bunching"],
            "start": this.state["start"],
            "end": this.state["end"],
            "minDate": this.state["start"],
            "maxDate": this.state["end"],
            "legend": [1, 10, 20, 30],
            "subDomainTitleFormat": {
                empty: "{date}",
                filled: "{count} {name} {connector} {date}"
            },

        };

        const config_stu = {
            "itemName": ["student", "students"],
            "start": this.state["start"],
            "end": this.state["end"],
            "minDate": this.state["start"],
            "maxDate": this.state["end"],
            "legend": [40, 70, 100, 130],
        };

        this.heatmap_bun = new HeatMap({
            "title": "HeatMap for Assessment Periods",
            "click":(date, item)=>{
            },
            "config": config_bun,
        });

        this.heatmap_stu = new HeatMap({
            "title": "HeatMap for Number of Students Doing Assessments",
            "click": (date, item)=>{},
            "config": config_stu
        });



        // init timeline
        const tl_ata = this.timeline_data();
        this.timeline = new Timeline(Object.assign(tl_ata,{
            config: {
                start: this.state["start"],
                end: this.state["end"],
                min: this.state["start"],
                max: this.state["end"],
                stack: true,
            },
            move_callback: (item) => {
                this.set_state({"changed": true})
            }
        }));
    }

    process_data(){
        /*data = {
            date:
            start:
            end:
            modules_:
            origin_data:
        }*/
        /**[{
            "asm_id": 1,
            "form_id":2,
            "project_id":3,
            "module_id": 4,
            "asm_format": "",
            "asm_release": "",
            "asm_due": "",
            "asm_name": "",
            "module_code":"",
            "academic":"",
            "run_in":"",
            "students": []
            },{}]
            * */

        const data = {};
        const project_data = window.global.projects.filter(term => term['project_id'] == this.state['project_id'])[0];
        this.state['editable'] = this.state['editable'] && (!project_data.done);
        data["date"] = parse_date(project_data["semester1"]["start"]);
        data["start"] = parse_date(project_data["semester1"]["start"]);
        data["end"] = parse_date(project_data["semester2"]["exam_period"]["end"]);
        const modules = [];
        let asm_data = [];
        for(let i in project_data["forms"]) {
            modules.push(project_data["forms"][i]['module']);

            for(let j in project_data["forms"][i]["assessments"]) {
                let d = {
                    "project_id":project_data["project_id"],
                    "form_id":project_data["forms"][i]["form_id"],
                    "module_id": project_data["forms"][i]["module_id"],
                    "module_code":project_data["forms"][i]["module"]["code"],
                    "run_in": project_data["forms"][i]["module"]["semester"],
                    "students": project_data["forms"][i]["module"]["students"],

                    "academic":project_data["forms"][i]["module"]["academic_name"],

                    "asm_id": project_data["forms"][i]["assessments"][j]["id"],
                    "asm_format": project_data["forms"][i]["assessments"][j]["asm_format"],
                    "asm_release": parse_date(project_data["forms"][i]["assessments"][j]["asm_release"]),
                    "asm_due": parse_date(project_data["forms"][i]["assessments"][j]["asm_due"]),
                    "asm_name": project_data["forms"][i]["assessments"][j]["asm_name"],
                    "asm_per": project_data["forms"][i]["assessments"][j]["asm_per"],
                };
                asm_data.push(d)
            }
        }


        asm_data = asm_data.sort((a,b) => a["asm_release"] - b["asm_release"]);
        data["origin_data"] = asm_data;
        data['modules'] = _.uniq(modules);

       return data;

    }

    heatmap_data_bun() {

        let asm_data = [];
        if(this.state["filter_module"]["id"] == "all") {
            asm_data = this.state["origin_data"]
        } else {
            asm_data = this.state["origin_data"].filter(term => term["module_id"] == this.state["filter_module"]["id"])
        }


        const heatmap_data = {};

        for(let i in asm_data) {
            const release = asm_data[i]['asm_release'];
            const due = asm_data[i]['asm_due'];
            const gap = Math.abs(dateFn.differenceInCalendarDays(release, due));

            for (let d = 1; (d-1) <= gap; d++ ) {
                console.log(gap)
                const new_timestamp = (dateFn.addDays(release, d-1).getTime() / 1000);
                const weight = asm_data[i]['asm_per'] / d;

                if(heatmap_data[new_timestamp]) {
                    heatmap_data[new_timestamp]+= weight
                } else {
                    heatmap_data[new_timestamp] = weight
                }
            }
        }
        let min = 1000;
        let max = 0;
        for(let k in heatmap_data) {
            if (heatmap_data[k] > max) max =  heatmap_data[k];
            if (heatmap_data[k] < min) min =  heatmap_data[k];
        }

        for(let k in heatmap_data) {
            heatmap_data[k] = parseFloat(((heatmap_data[k]-min)*100/(max-min)).toFixed(2));

        }
        return heatmap_data
    }

    heatmap_data_stu() {
        let asm_data = [];
        if(this.state["filter_module"]["id"] == "all") {
            asm_data = this.state["origin_data"]
        } else {
            asm_data = this.state["origin_data"].filter(term => term["module_id"] == this.state["filter_module"]["id"])
        }


        const heatmap_data = {};

        for(let i in asm_data) {
            const release = asm_data[i]['asm_release'];
            const due = asm_data[i]['asm_due'];
            const gap = Math.abs(dateFn.differenceInCalendarDays(release, due));


            for (let d = 1; d <= gap; d++ ) {
                const new_timestamp = (dateFn.addDays(release, d-1).getTime() / 1000);
                const students = asm_data[i]['students'];

                if(heatmap_data[new_timestamp]) {
                    heatmap_data[new_timestamp].push(...students)
                } else {
                    heatmap_data[new_timestamp] = []
                    heatmap_data[new_timestamp].push(...students)
                }
            }
        }

        for(let k in heatmap_data) {
            heatmap_data[k] = _.union(heatmap_data[k]).length
        }
        return heatmap_data
    }

    timeline_data() {
        const groups = [];
        _.forEach(this.state["modules"], module => {
            const group = {
                id: module['id'],
                content: module["code"] + " / " + module["semester"]
            }

            groups.push(group)
        });

        const items = [];
        _.forEach( this.state['origin_data'], asm => {
            const item = {
                id: asm["asm_id"],
                content: asm["asm_name"],
                group: asm['module_id'],
                start: moment(asm["asm_release"]).format('YYYY-MM-DD'),
                end: moment(asm["asm_due"]).format('YYYY-MM-DD'),
                type: asm["asm_release"].getTime() == asm["asm_due"].getTime()? "box": "range",
                editable: this.state['editable'] ? {
                    remove: false,
                    updateGroup:false,
                    updateTime: true,
                    overrideItems: true
                }: this.state['editable'],
                align: 'left'
            };
            items.push(item)
        });
        return {
            groups: groups,
            items: items,
        }
    }

    update() {
        this.heatmap_bun.set_state({
            "data": this.heatmap_data_bun(),
        });

        this.heatmap_stu.set_state({
            "data": this.heatmap_data_stu(),
        });

        switch (this.state['graph']) {
            case 'heatmap':
                this.heatmap_panel.css({
                    display: "block"
                });
                this.timeline_panel.css({
                    display: "none"
                });

                this.header.empty();
                this.header.append(this.module_seletion());
                this.header.append(this.heatmap_nav_btn());
                this.header.append(this.visual_selection());

                break;
            case 'timeline':
                this.heatmap_panel.css({
                    display: "none"
                });
                this.timeline_panel.css({
                    display: "block"
                });
                this.header.empty();
                this.header.append(this.timeline_blank_block());
                this.header.append(this.state["editable"]? this.timeline_fn_btn():this.timeline_blank_block());
                this.header.append(this.visual_selection());
                break;
        }
    }

    heatmap_peroid_next() {
        const n = 3;
        this.heatmap_bun.next(n);
        this.heatmap_stu.next(n);
        this.state["date"] = dateFn.addMonths(this.state["date"], n);

    }

    heatmap_peroid_pre() {
        const n = 3;
        this.heatmap_bun.previous(n);
        this.heatmap_stu.previous(n);
        this.state["date"] = dateFn.subMonths(this.state["date"], n);


    }

    render() {

        this.timeline_panel.append(this.timeline.render());

        this.heatmap_panel.append(this.heatmap_bun.render());
        this.heatmap_panel.append(this.heatmap_stu.render());

        this.container.append(this.header);
        this.container.append(this.heatmap_panel);
        this.container.append(this.timeline_panel);


        return this.container;
    }

}

export default Visualization