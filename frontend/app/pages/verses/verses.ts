import {Component} from "angular2/core";
import {Http, HTTP_PROVIDERS, URLSearchParams} from "angular2/http";
import {OnActivate, RouteParams} from "angular2/router";


import {TranslationsService} from "../../modules/translations/translations.service";

import {VersesTranslationComponent} from "../../modules/verses-translation/verses-translation.component";

@Component({
    selector: "page-verses",
    templateUrl: "app/pages/verses/verses.template.html",
    providers: [HTTP_PROVIDERS],
    directives: [VersesTranslationComponent],
})
export class VersesComponent implements OnActivate {

    results: any;

    versesMerge: boolean = false;

    constructor(
        private http: Http,
        private routeParams: RouteParams,
        private translationsService: TranslationsService
    ) {
        let params: URLSearchParams = new URLSearchParams();
        params.set("t", this.routeParams.get("translations"));
        let verseQuery = this.routeParams.get("query");

        this.http.get(
            `http://localhost:5000/api/v1/verses/${verseQuery}?`, {
                search: params,
            }
        ).subscribe(response => {
            this.results = response.json();
        });
    }

    toggleVersesMerge() {
        this.versesMerge = !this.versesMerge;
    }

    routerOnActivate() {
        this.translationsService.prepareEnabled(this.routeParams);
    }
}
