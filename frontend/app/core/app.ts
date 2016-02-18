"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterOutlet, RouterLink, Router} from "angular2/router";

import {Http, HTTP_PROVIDERS, URLSearchParams} from "angular2/http";

// app components
import {Home} from "../pages/home/home";

// app services
import {SearchboxComponent} from "../searchbox/searchbox.component";
import {TranslationComponent} from "../translations/translation.component";
import {TranslationsService} from "../translations/translations.service";
import {HomeComponent} from "../home/home.component";
import {SearchComponent} from "../search/search.component";
import {VersesComponent} from "../verses/verses.component";

@Component({
	selector: "app",
	templateUrl: "core/app.template.html", //template: "<router-outlet></router-outlet>",
	directives: [
        RouterOutlet, RouterLink, SearchboxComponent, TranslationComponent
    ]
})
@RouteConfig([
    {
        path: "/",
        name: "Home",
        component: HomeComponent,
    }, {
        path: "/verses/:translations/:query",
        name: "Verses",
        component: VersesComponent,
    }, {
        path: "/search/:translations/:query",
        name: "Search",
        component: SearchComponent,
    }
])
export class App {

	results: any;

    constructor(
        private http: Http,
        private translationsService: TranslationsService
    ) { }

    search(searchTerm: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set("t", this.translationsService.enabledTranslations);

        this.http.get(
            `http://localhost:5000/api/v1/search/${searchTerm}?`, {
                search: params,
            }
        ).subscribe(response => {
            this.results = response.json();
        });
    }
}
