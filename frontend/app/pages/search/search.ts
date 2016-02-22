import {Component} from "angular2/core";
import {Http, URLSearchParams} from "angular2/http";
import {OnActivate, RouteParams, RouterLink} from "angular2/router";

import {TranslationComponent} from "../../modules/translations/translation.component";
import {TranslationsService} from "../../modules/translations/translations.service";

@Component({
    selector: "page-search",
    templateUrl: "app/pages/search/search.template.html",
    directives: [RouterLink, TranslationComponent],
})
export class SearchComponent implements OnActivate {

    results: any;

    constructor(
        private http: Http,
        private routeParams: RouteParams,
        private translationsService: TranslationsService
    ) {
        let params: URLSearchParams = new URLSearchParams();
        params.set("t", this.routeParams.get("translations"));

        let searchQuery = this.routeParams.get("query");

        this.http.get(
            `http://localhost:5000/api/v1/search/${searchQuery}?`, {
                search: params,
            }
        ).subscribe(response => {
            this.results = response.json();
            this.results.forEach(verse => {
                verse.address = `${verse.book} ${verse.chapter}:${verse.verse}`;
            })
        });
    }

    routerOnActivate() {
        this.translationsService.prepareEnabled(this.routeParams);
    }
}
