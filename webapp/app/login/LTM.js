import BaseNode from "../util/BaseNode";
import $ from "jquery";
import {add_animate} from "../util/node_util";
import request from "superagent";
import {RQ_HOST} from "../util/constant";
import LoginPanel from "./LoginPanel";
import 'bootstrap'
import '../../style/home_page.css'


class LTM extends BaseNode {

    constructor() {
        super();

        // UI

        this.state = {
            title: "LTM",
        };
        this.home_page = $('<div class="home_page"></div>');
        // this.container_block = $('<div class="container_block"></div>');
        // this.panel = $('<div class="panel"></div>');
        // this.logo = $('<span class="logo"></span>');
        // this.list = $('<div class="list">' +
        //     '<ul>' +
        //     '<li>Home</li>' +
        //     '<li>Home2</li>' +
        //     '<li>Home3</li>' +
        //     '</ul>' +
        //     '</div>');


        // Event


        this.container_block = $('<nav class="navbar navbar-light bg-white"></nav>');

        this.navbar_brand = $('<a class="navbar-brand" href="#">Admin</a>');
        this.logo = $('<span class="logo"></span>');
        this.button = $('<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">\n' +
            '    <span class="navbar-toggler-icon"></span>' +
            '  </button>');
        this.side_bar =$('<div class="sidebar-sticky">\n' +
            '        <ul class="nav flex-column">\n' +
            '          <li class="nav-item">\n' +
            '            <a class="nav-link active" href="#">\n' +
            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>\n' +
            '              Project <span class="sr-only">(current)</span>\n' +
            '            </a>\n' +
            '          </li>\n' +
            '          <li class="nav-item">\n' +
            '            <a class="nav-link" href="#">\n' +
            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>\n' +
            '              Username\n' +
            '            </a>\n' +
            '          </li>\n' +
            '          <li class="nav-item">\n' +
            '            <a class="nav-link" href="#">\n' +
            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>\n' +
            '              Space 3\n' +
            '            </a>\n' +
            '          </li>\n' +
            '          <li class="nav-item">\n' +
            '            <a class="nav-link" href="#">\n' +
            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>\n' +
            '              Space 4\n' +
            '            </a>\n' +
            '          </li>\n' +
            '          <li class="nav-item">\n' +
            '            <a class="nav-link" href="#">\n' +
            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>\n' +
            '             Space 5\n' +
            '            </a>\n' +
            '          </li>\n' +
            '          <li class="nav-item">\n' +
            '            <a class="nav-link" href="#">\n' +
            '              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>\n' +
            '              Space 6\n' +
            '            </a>\n' +
            '          </li>\n' +
            '        </ul>\n' +
            '\n' +
            '        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">\n' +
            '          <span>Saved reports</span>\n' +
            '          <a class="d-flex align-items-center text-muted" href="#">\n' +
            '            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>\n' +
            '          </a>\n' +
            '        </h6>\n' +
            '      </div>');

        $('title').text('LTM');
    }


    render() {
        //super.render();
        // this.panel.append(this.logo);
        // this.panel.append(this.list);
        // this.container_block.append(this.panel);
        // this.year_tutor.append(this.container_block);
        this.home_page.append(this.container_block)
        this.container_block.append(this.navbar_brand);
        this.container_block.append(this.logo);
        this.container_block.append(this.button);
        this.home_page.append(this.side_bar);
        //this.container_block.append(this.menu);

        return this.home_page;
    }


}

export default LTM;