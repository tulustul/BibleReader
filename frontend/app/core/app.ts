"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {
    Router,
    RouteConfig,
    RouterOutlet,
    RouteParams,
    RouterLink,
} from "angular2/router";

import {Http, URLSearchParams} from "angular2/http";

// app components
import {SearchboxComponent} from "../modules/searchbox/searchbox.component";
import {TranslationsService} from "../modules/translations/translations.service";
import {Home} from "../pages/home/home";
import {Reader} from "../pages/reader/reader";
import {About} from "../pages/about/about";


@Component({
	selector: "app",
	templateUrl: "core/app.template.html",
	directives: [
        RouterOutlet,
        RouterLink,
        SearchboxComponent,
    ],
})
@RouteConfig([
    {
        path: "/",
        name: "Home",
        component: Home,
        useAsDefault: true,
    }, {
        path: "/reader/...",
        name: "Reader",
        component: Reader,
    }, {
        path: "/about",
        name: "About",
        component: About,
    }
])
export class App {
    links = [
        {
            name: "Home",
            params: ["Home"],
        }, {
            name: "Read",
            params: [
                "Reader",
                "Verses",
                {translations: "1", query: "gen 1:1"},
            ],
        }, {
            name: "About",
            params: ["About"],
        },
    ];

    constructor(private router: Router) {}
}
