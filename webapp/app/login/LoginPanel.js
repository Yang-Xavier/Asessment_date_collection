import $ from "jquery"
import request from 'superagent'
import {Base64} from 'js-base64'
import Cookies from 'js-cookie'

import BaseNode from "../util/BaseNode"
import {add_animate} from "../util/node_util";
import '../../style/login_panel.css'
import {RQ_HOST} from '../util/constant'


class LoginPanel extends BaseNode{

    constructor(param) {
        super(param);

        // UI
        this.set_state({
            title: "Module Deliver",
            checkBoxLabel: "Remember me",
            loginBtnLabel: "Login in"
        });

        this.login_panel = $('<div class="login_all_panel vmbox"></div>');
        this.container = $('<div class="container_block"></div>');

        this.header = $('<div class="header"></div>');
        this.title_ = $('<span class="mole"></span>');
        this.logo = $('<span class="logo"></span>');

        this.form_block = $('<div class="form_block" ></div>');
        this.account_input = $('<input type="email" class="account" placeholder="email"/>');
        this.pwd_input = $('<input type="password" class="password" placeholder="password"/>');
        this.check_block = $('<div class="check_block"></div>');
        this.check_box = $('<input type = "checkbox"/>');
        this.label = $('<span></span>');
        this.inform_block = $('<div class="inform_block"></div>');
        this.login_btn = $('<button></button>');

        $('title').text('Login');

        this.title_.text(this.state["title"]);
        this.label.text(this.state["checkBoxLabel"]);
        this.login_btn.text(this.state["loginBtnLabel"]);

        // Event

        this.login_btn.click(() => {
            let email = 'user.2@sheffield.ac.uk';//this.account_input.val();
            let pwd =  'password';//this.pwd_input.val();
            let authorization = "Basic " + Base64.encode(email+":"+pwd);

            if (email == '' || pwd == '') {
                add_animate(this.container,'jello');
                this.inform_block.html("Please enter the email or password.");
                this.inform_block.css({
                    'display' : 'block'
                });
                return
            }

            request
                .get(RQ_HOST+'/api/token')
                .set({'authorization': authorization})
                .then(this.success_call.bind(this), this.error_call.bind(this))
                .catch((e)=>{
                    console.log(e)
                })
        });
    }


    error_call(msg) {
        add_animate(this.container,'shake');
        this.inform_block.html("Sorry, account or password is wrong.</br>Please try again.");
        this.inform_block.css({
            'display' : 'block'
        })
    };

    success_call(msg) {
        const remember_me = this.check_box.is(":checked");
        const json_data = JSON.parse(msg.text);
        if(remember_me) {
            Cookies.set("re", 1);
        }
        Cookies.set('token', json_data.token);
        add_animate(this.container,'bounceOutUp', () => {
            this.state['callback']({"user_type": 'academic'})
        });

    //    then get the information of the user
    };


    before_render() {
        add_animate(this.container, 'bounceInDown');
    }

    update() {

    }

    render() {

        this.header.append(this.logo);
        this.header.append(this.title_);

        this.check_block.append(this.check_box);
        this.check_block.append(this.label);

        this.form_block.append(this.account_input);
        this.form_block.append(this.pwd_input);
        this.form_block.append(this.check_block);
        this.form_block.append(this.login_btn);
        this.form_block.append(this.inform_block);

        this.container.append(this.header);
        this.container.append(this.form_block);

        this.login_panel.append(this.container);

        return this.login_panel
    }

}

export default LoginPanel;