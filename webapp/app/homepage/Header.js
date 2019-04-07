import $ from "jquery";
import BaseNode from "../util/BaseNode";
import {LetterAvatar} from "../util/node_util"
import {add_animate} from "../util/node_util";

class Header extends BaseNode{
    constructor(param) {
        super(param);
        /*
        * param = {
        *   user_type: [academic, ltm, tutor]
        *   login_out_callback: ()=>{}
        * }
        * */

        this.set_state({
            welcome: (new Date()).getHours()> 12? "Good Afternoon ": "Good Morning "
        });
        this.container = $('<div class="header_bar"></div>');
        this.log_out_btn = $('<div class="log_out_btn"><i class="fas fa-sign-out-alt"/></div>');
        this.logo = $('<div class="logo"><div class="i"/></div>');
        this.welcome  = $('<div class="welcome_block"><span>' + this.state['welcome'] + '</span><span>' + this.state['user_name'] + '</span></div>');
        this.profile = $('<div class="profile" title="' + this.state['user_type'] + '"><img src= "'+ LetterAvatar(this.state['user_name']) + '"/> </div>');
        this.log_out_btn.on('click', () =>{this.log_out()});

        let timeout_id = null;
        let flip_flag = false;
        let mouse_out = true;

        this.logo.on("mouseenter", () => {
            timeout_id = setTimeout(()=>{
                const i_block = this.logo.find(".i");
                mouse_out = false;
                if(!flip_flag) {
                    add_animate( i_block, 'flipOutX', ()=>{
                        i_block.append(this.welcome);
                        i_block.css({
                            background: "transparent",
                        });
                        add_animate(i_block, 'flipInX', ()=>{
                            flip_flag = true;
                            if(mouse_out) {
                                add_animate( i_block, 'flipOutX', ()=>{
                                    i_block.html(" ");
                                    i_block.css({
                                        background: "url('https://www.sheffield.ac.uk/polopoly_fs/15.375.1548777706!/assets/images/uos-crest.svg') -10px center no-repeat transparent",
                                        backgroundSize: "100px 50px"
                                    });
                                    add_animate(i_block, 'flipInX', ()=>{
                                        flip_flag = false;
                                    })
                                });
                            }
                        });
                    })
                }
            }, 1000)
        });

        this.logo.on("mouseleave", ()=>{
            clearTimeout(timeout_id);
            mouse_out = true;
            if(flip_flag) {
                const i_block = this.logo.find(".i");
                add_animate( i_block, 'flipOutX', ()=>{
                    i_block.html(" ");
                    i_block.css({
                        background: "url('https://www.sheffield.ac.uk/polopoly_fs/15.375.1548777706!/assets/images/uos-crest.svg') -10px center no-repeat transparent",
                        backgroundSize: "100px 50px"
                    });
                    add_animate(i_block, 'flipInX', ()=>{
                        flip_flag = false;
                    })
                });
            }
        })

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
        this.container.append(this.log_out_btn);

        return this.container;
    }
}

export default Header;