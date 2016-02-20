import {Component} from "angular2/core";
import {Http, HTTP_PROVIDERS, URLSearchParams} from "angular2/http";
import {Router} from "angular2/router";


import {TranslationsService} from "../translations/translations.service";

@Component({
    selector: "searchbox",
    templateUrl: "app/modules/searchbox/searchbox.template.html",
    providers: [HTTP_PROVIDERS],
})
export class SearchboxComponent {

    results: any;

    constructor(
        private router: Router,
        private translationsService: TranslationsService
    ) { }

    search(searchTerm: string) {
        let isVerseQuery = /(\w+){2,4} \d+(:\d+(-\d+)?)?/g.test(searchTerm);
        if (isVerseQuery) {
            this.goToVerse(searchTerm);
        } else {
            this.query(searchTerm);
        }
    }

    private goToVerse(verseQuery: string) {
        this.router.navigate(["Reader", "Verses", {
            query: verseQuery,
            translations: "" + this.translationsService.enabledTranslations,
        }]);
    }

    private query(searchQuery: string) {
        this.router.navigate(["Reader", "Search", {
            query: searchQuery,
            translations: "" + this.translationsService.enabledTranslations,
        }]);
    }
}
