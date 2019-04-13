import $ from 'jquery'
import dateFn from 'date-fns'
import _ from 'lodash'


import BaseNode from "../util/BaseNode"

import HeatMap from '../module/Heatmap'

import {parse_date} from "../util/data_parse_util";

import '../../style/visualisation_page.css'

class Visualization extends BaseNode{
    constructor(param) {
        // param = {project_id: '', editable: true}
        super(param);


        this.state["filter_module"] = {"id": "all"};


        this.set_state(this.process_data());



        this.container = $("<div class='v_container'/>");


        this.header = (()=>{
            const container = $("<div class='fun_nav'/>");
            const modules_selection = (()=>{
                const div = $("<div class='selection_block'/>");

                const options = (() => {
                    const selection = $("<select class='selection'/>");
                    const option_module = {};
                    const op = $("<option _id='all'>All</option>");
                    op.attr("_id" , "all");
                    selection.append(op);
                    _.forEach(this.state['origin_data'], term => {
                        if(!option_module[term['module_id']]) {
                            option_module[term['module_id']] = term['module_code'];
                            const item = $("<option>" + term['module_code'] +  " / " + term["run_in"] + "</option>");
                            item.attr("_id" ,term['module_id']);
                            selection.append(item);
                        }
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
            })();

            const nav_btn = (()=>{
                const cont = $("<div/>");
                const next_btn = $("<button class='next_btn'>Next</button>");
                const pre_btn = $("<button class='pre_btn'>Previous</button>");

                next_btn.on('click', ()=>{

                    if(this.state["date"]>=dateFn.addMonths(this.state["start"],6)){
                        next_btn.addClass("ban")
                    } else {
                        this.heatmap_peroid_next();
                        pre_btn.removeClass("ban")
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
            })();

            const visual_selection = (()=>{
                const cont = $("<div class='visul_btn'/>");
                const heatmap_btn = $("<div class='btn'>HeatMap</div>");
                const timeline_btn = $("<div class='btn'>TimeLine</div>");



                cont.append(heatmap_btn);
                cont.append(timeline_btn);
                return cont
            });


            container.append(modules_selection);
            container.append(nav_btn);
            container.append(visual_selection);

            return container;
        })();

        this.heatmap_panel = $("<div class='visul_panel' />");

        this.timeline_panel = $("<div class='visul_panel'/>");


    }

    process_data(){
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
        const project_data = window.global.projects.filter(term => term['project_id'] == this.state['project_id'])[0]

        data["date"] = parse_date(project_data["semester1"]["start"]);
        data["start"] = parse_date(project_data["semester1"]["start"]);
        data["end"] = parse_date(project_data["semester2"]["exam_period"]["end"]);


        let asm_data = [];
        for(let i in project_data["forms"]) {
            for(let j in project_data["forms"][i]["assessments"]) {
                let data = {
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
                asm_data.push(data)
            }
        }

        asm_data = asm_data.sort((a,b) => a["asm_release"] - b["asm_release"]);
        data["origin_data"] = asm_data;
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

            for (let d = 1; d <= gap; d++ ) {
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
            heatmap_data[k] = parseFloat(((heatmap_data[k]-min)/(max-min)).toFixed(4));

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

    }

    update() {

        if(!(this.heatmap_bun&&this.heatmap_stu)){
            this.heatmap_bun = new HeatMap({
                "title": "HeatMap for Assessment Periods",
                "name": ["bunching", "bunching"],
                "start": this.state["start"],
                "end": this.state["end"],
                "legend": [0.005, 0.01, 0.02, 0.3],
                "click":()=>{}
            });


            this.heatmap_stu = new HeatMap({
                "title": "HeatMap for Number of Students Doing Assessments",
                "name": ["student", "students"],
                "start": this.state["start"],
                "end": this.state["end"],
                "legend": [2, 8, 12, 16],
                "click": ()=>{}
            });

        }

        this.heatmap_bun.set_state({
            "data": this.heatmap_data_bun(),
        });

        this.heatmap_stu.set_state({
            "data": this.heatmap_data_stu(),
        })
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

        this.heatmap_panel.append(this.heatmap_bun.render());
        this.heatmap_panel.append(this.heatmap_stu.render());

        this.container.append(this.header);
        this.container.append(this.heatmap_panel);
        this.container.append(this.timeline_panel);


        return this.container;
    }

}

export default Visualization