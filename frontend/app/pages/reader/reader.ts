"use strict";

import {RouteConfig, RouterOutlet, RouteParams} from "angular2/router";
import {Component} from "angular2/core";

import {SidebarComponent} from "../../modules/sidebar/sidebar.component";
import {TabComponent} from "../../modules/sidebar/tab.component";
import {TranslationComponent} from "../../modules/translations/translation.component";

import {SearchComponent} from "../search/search";
import {VersesComponent} from "../verses/verses";

@Component({
    selector: "page-reader",
    templateUrl: "pages/reader/reader.template.html",
    directives: [
        RouterOutlet,
        SidebarComponent,
        TabComponent,
        TranslationComponent,
    ]
})
@RouteConfig([
    {
        path: "/verses/:translations/:query",
        name: "Verses",
        component: VersesComponent,
    }, {
        path: "/search/:translations/:query",
        name: "Search",
        component: SearchComponent,
    }
])
export class Reader {}
