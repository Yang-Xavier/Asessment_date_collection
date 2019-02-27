import $ from "jquery"
import request from 'superagent'

import {add_animate} from "../util/node_util";
import '../../style/login_panel.css'
import jsSHA from '../lib/sha1'
import {RQ_HOST} from '../util/constant'

// UI
const login_panel = $('<div class="login_all_panel vmbox"></div>');
const container = $('<div class="container_block"></div>');

const header = $('<div class="header"></div>');
const title_ = $('<span class="mole">Module Deliver</span>');
const logo = $('<span class="logo"></span>');


const form_block = $('<div class="form_block" ></div>');
const account_input = $('<input type="email" class="account" placeholder="email"/>');
const pwd_input = $('<input type="password" class="password" placeholder="password"/>');
const check_block = $('<div class="check_block"></div>');
const check_box = $('<input type = "checkbox"/>');
const label = $('<span>Rmember me</span>');
const inform_block = $('<div class="inform_block"></div>');
const login_btn = $('<button>Log in</button>');


// Event
$('title').text('Login');

const error_call = () => {
    add_animate(container,'shake');
    inform_block.html("Sorry, account or password is wrong.</br>Please try again.");
    inform_block.css({
        'display' : 'block'
    })
};

const success_call = () => {
    const remember_me = check_box.is(":checked");
    add_animate(container,'bounceOutUp');
    inform_block.html("Please enter the email or password.");
    inform_block.css({
        'display' : 'block'
    });
    console.log("Login successfully!")
};

const hash_password = (pwd) => {
    try {
        const hashed_pwd = new jsSHA("SHA-1", "TEXT", {numRounds: 1});
        hashed_pwd.update(pwd);
        return hashed_pwd.getHash("HEX");
    } catch (e) {
        console.log(e.message);
        return null
    }
}

login_btn.click(() => {

    let email = account_input.val();
    let pwd =  pwd_input.val();

    if (email == '' || pwd == '') {
        add_animate(container,'jello');
        inform_block.html("Please enter the email or password.");
        inform_block.css({
            'display' : 'block'
        });
        return
    }

    pwd = hash_password(pwd);

    request
        .post(RQ_HOST+'/api/login')
        .type("json")
        .send({'email': email, "password": pwd})
        .then(success_call, error_call)
        .catch((e)=>{console.log(e)})
});


header.append(logo);
header.append(title_);

check_block.append(check_box);
check_block.append(label);

form_block.append(account_input);
form_block.append(pwd_input);
form_block.append(check_block);
form_block.append(login_btn);
form_block.append(inform_block);

container.append(header);
container.append(form_block);

login_panel.append(container);

login_panel.render_event = {
    "before": () => {
        add_animate(container, 'bounceInDown');
    }
};

export default login_panel;