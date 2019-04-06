import $ from "jquery"

import '../../style/form_style.css'
import SingleField from './SingleField'

import BaseNode from "../util/BaseNode"
import {add_animate} from '../util/node_util'

/*
* Based on bootstrap*/
class EditableForm extends BaseNode{
    constructor(param) {
        // param e.g.

        super(param);

        // states
        this.set_state({
            form_fields:[],
            field_counter: 0,
            editable: true
        });


        this.header = $("<div class='header'></div>");
        this.container = $("<div class='form_container'></div>");
        this.buttom_btn_block = $("<div class='btn_block'></div>");


        this.form_Panel = $("<form role='form'></form>");
        this.submit_btn = $('<button type="button" class="btn btn-secondary submit_btn">Save</button>');
        this.add_more_btn = $('<button type="button" class="btn btn-light add_btn">Add More Assessment</button>')

        this.semester_selection = $("<label>" + "Semester: " + this.state["semester"] + "</label>");


        this.head_label = $("<label></label>");
        this.head_label.text("Project: " + this.state['form_name']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Academic: " + this.state['username']);
        this.header.append(this.head_label);
        this.head_label = $("<label></label>");
        this.head_label.text("Module: " + this.state['module_code']);
        this.header.append(this.head_label);
        this.header.append(this.semester_selection);

        const init_state_single_form = {
            editable: this.state['editable'],
            removable: false,
            title: "Assignment ",
            index: this.state["field_counter"],
            remove_callback: this.remove_field.bind(this)
        };

        if (this.state['form_data'].length > 0) {
            const state = Object.assign(init_state_single_form, this.state['form_data'][0]);
            const new_field = new SingleField(state);
            this.state["form_fields"].push(new_field);
            this.state["field_counter"]++;

            for(let i = 1; i < this.state['form_data'].length; i++) {
                init_state_single_form.removable = true;
                init_state_single_form.index = i;

                const state = Object.assign(init_state_single_form,this.state['form_data'][i]);
                const new_field = new SingleField(state);
                this.state["form_fields"].push(new_field);
                this.state["field_counter"]++;
            }

        } else {
            init_state_single_form.removable = true;
            const new_field = new SingleField(init_state_single_form);
            this.state["form_fields"].push(new_field);
            this.state["field_counter"]++;
        }

        this.submit_btn.on('click', ()=>{this.save()});
        this.add_more_btn.on('click', ()=>{this.add_more()});
    }

    add_more() {
        const new_field = new SingleField({
            editable:true,
            removable: true,
            title: "Assignment ",
            index: this.state["field_counter"],
            remove_callback: this.remove_field.bind(this)
        });
        this.form_Panel.append(new_field.render());
        this.state["form_fields"].push(new_field);
        this.state["field_counter"]++;
    }

    remove_field(index) {
        this.state["form_fields"] = this.state["form_fields"]
            .slice(0,index)
            .concat(this.state["form_fields"].slice(index+1));
        this.state["field_counter"]--;
        for(let i in this.state["form_fields"]) {
            this.state["form_fields"][i].set_state({'index': parseInt(i)});
        }

    }

    check() {
        let per = 0;

        for(let i in this.state['form_fields']) {
            if(this.state['form_fields'][i].state['asm_name'] == ""){
                this.state['form_fields'][i].asm_name_field.find('input').css({"border": "1px solid red"});
                add_animate(this.state['form_fields'][i].asm_name_field.find('input'),'shake')
                alert("Please submit the name");
                return
            }
            else{
                this.state['form_fields'][i].asm_name_field.find('input').css({"border": "1px solid #ced4da"})
            }

            per += parseInt(this.state['form_fields'][i].state['asm_per']);
            if(this.state['form_fields'][i].state['asm_per'] == ""){
                this.state['form_fields'][i].asm_per_field.find('input').css({"border": "1px solid red"});
                alert("Please submit the percentage");
                add_animate(this.state['form_fields'][i].asm_per_field.find('input'),'shake')
                return
            }
            else if(per==100){
                this.state['form_fields'][i].asm_per_field.find('input').css({"border": "1px solid #ced4da"})
            }
            else {
                for(let i in this.state['form_fields']) {
                    this.state['form_fields'][i].asm_per_field.find('input').css({"border": "1px solid red"})
                    add_animate(this.state['form_fields'][i].asm_per_field.find('input'),'shake')
                }
                alert("The total percentage should equal to 100%");
                return
            }

            if(this.state['form_fields'][i].state['asm_release'] == ""){
                this.state['form_fields'][i].asm_period_field.find('input').css({"border": "1px solid red"})
                alert("Please submit the peroid");
                add_animate(this.state['form_fields'][i].asm_period_field.find('input'),'shake')
                return
            }
            else{
                this.state['form_fields'][i].asm_period_field.find('input').css({"border": "1px solid #ced4da"})
            }

        }

        return true
    }

    save(){
        if(this.check()){
            this.submit()
        }
        else{
            console.log("Not submit")
        }
    }
    submit() {
        let data = {

        };
        const items = [];
        for(let i in this.state['form_fields']) {
            const item ={};
            item['asm_format'] =  this.state['form_fields'][i].state['asm_format'];
            item['asm_name'] = this.state['form_fields'][i].state['asm_name'];
            item['asm_per'] = this.state['form_fields'][i].state['asm_per'];
            item['asm_release'] = this.state['form_fields'][i].state['asm_release'];
            item['asm_due'] = this.state['form_fields'][i].state['asm_due'];
            items.push(item)
        }
    }

    render() {

        this.buttom_btn_block.append(this.submit_btn);
        this.buttom_btn_block.append(this.add_more_btn);

        for(let i in this.state.form_fields) {
            this.form_Panel.append(this.state.form_fields[i].render());
        }

        this.container.append(this.header);
        this.container.append(this.form_Panel);
        this.container.append(this.buttom_btn_block);

        return this.container;
    }

}

export default EditableForm;