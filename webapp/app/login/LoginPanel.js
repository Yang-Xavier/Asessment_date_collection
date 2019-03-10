import $ from "jquery"
import request from 'superagent'

import BaseNode from "../util/BaseNode"
import {add_animate} from "../util/node_util";
import '../../style/login_panel.css'
import jsSHA from '../lib/sha1'
import {RQ_HOST} from '../util/constant'


class LoginPanel extends BaseNode{

    constructor() {
        super();

        // UI

        this.state = {
            title: "Module Deliver",
            checkBoxLabel: "Remember me",
            loginBtnLabel: "Login in"
        };

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

        // Event


        this.login_btn.click(() => {
            let email = this.account_input.val();
            let pwd =  this.pwd_input.val();

            if (email == '' || pwd == '') {
                add_animate(this.container,'jello');
                this.inform_block.html("Please enter the email or password.");
                this.inform_block.css({
                    'display' : 'block'
                });
                return
            }
            pwd = this.hash_password(pwd);

            request
                .post(RQ_HOST+'/api/login')
                .type("json")
                .send({'email': email, "password": pwd})
                .then(this.success_call.bind(this), this.error_call.bind(this))
                .catch((e)=>{console.log(e)})
        });
    }


    error_call() {
        add_animate(this.container,'shake');
        this.inform_block.html("Sorry, account or password is wrong.</br>Please try again.");
        this.inform_block.css({
            'display' : 'block'
        })
    };

    success_call() {
        const remember_me = this.check_box.is(":checked");
        add_animate(this.container,'bounceOutUp');
        this.inform_block.html("Please enter the email or password.");
        this.inform_block.css({
            'display' : 'block'
        });
        console.log("Login successfully!")
    };

    hash_password(pwd) {
        try {
            const hashed_pwd = new jsSHA("SHA-1", "TEXT", {numRounds: 1});
            hashed_pwd.update(pwd);
            return hashed_pwd.getHash("HEX");
        } catch (e) {
            console.log(e.message);
            return null
        }
    }

    before_render() {
        add_animate(this.container, 'bounceInDown');
    }

    update() {
        this.title_.text(this.state.title);
        this.label.text(this.state.checkBoxLabel);
        this.login_btn.text(this.state.loginBtnLabel);
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