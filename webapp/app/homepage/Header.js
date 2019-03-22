import $ from "jquery";
import BaseNode from "../util/BaseNode";
import {LetterAvatar} from "../util/node_util"

class Header extends BaseNode{
    constructor(param) {
        super(param);
        /*
        * param = {
        *   user_type: [academic, ltm, tutor]
        *   user_name:
        *   login_out_callback: ()=>{}
        * }
        * */

        this.set_state({
            welcome: (new Date()).getHours()> 12? "Good Afternoon, ": "Good Morning, "
        });
        this.container = $('<div class="header_bar"></div>');
        this.log_out_btn = $('<div class="log_out_btn"><i class="fas fa-sign-out-alt"/></div>');
        this.logo = $('<div class="logo"><i/></div>');
        this.welcome  = $('<div class="welcome_block"><span>' + this.state['welcome'] + '</span><span>' + this.state['user_name'] + '</span></div>');
        this.profile = $('<div class="profile" title="' + this.state['user_type'] + '"><img src= "'+ LetterAvatar(this.state['user_name']) + '"/> </div>');
        this.log_out_btn.on('click', () =>{this.log_out()});

    }

    get_role_logo() {
        const role = $("<i class=' role fas'/>");
        switch (this.state['user_type']){
            case 'ltm':
                role.addClass('ltm fa-user-tie');
                break;
            case 'tutor':
                role.addClass('tutor fa-user-tag');
                break;
            default:
                role.addClass('default fa-user');
        }

        return role;
    }

    log_out() {
        this.state['login_out_callback']();
    }

    render() {

        this.profile.append(this.get_role_logo());

        this.logo.append(this.profile);

        this.container.append(this.logo);
        this.container.append(this.welcome);
        this.container.append(this.log_out_btn);

        return this.container;
    }
}

export default Header;