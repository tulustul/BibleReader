import {Component, } from "angular2/core";
import {Http, HTTP_PROVIDERS, URLSearchParams} from "angular2/http";
import {Router, Location} from "angular2/router";


import {TranslationsService} from "../translations/translations.service";

var VERSE_PATTERN = /^(\w{2,4})( (\d+)(:(\d+)(-(\d+))?)?)?$/;


@Component({
    selector: "searchbox",
    templateUrl: "app/modules/searchbox/searchbox.template.html",
    providers: [HTTP_PROVIDERS],
})
export class SearchboxComponent {

    query: string;

    constructor(
        private router: Router,
        private location: Location,
        private translationsService: TranslationsService
    ) {
        let tokens: string[] = location.path().split('/');
        this.query = tokens[tokens.length - 1].replace('%20', ' ');
    }

    search() {
        this.query = this.query.trim();
        let isVerseQuery = VERSE_PATTERN.test(this.query);
        if (isVerseQuery) {
            this.goToVerse(this.query);
        } else {
            this.goToSearch(this.query);
        }
    }

    private goToVerse(verseQuery: string) {
        this.router.navigate(["Reader", "Verses", {
            query: verseQuery,
            translations: "" + this.translationsService.enabledTranslations,
        }]);
    }

    private goToSearch(searchQuery: string) {
        this.router.navigate(["Reader", "Search", {
            query: searchQuery,
            translations: "" + this.translationsService.enabledTranslations,
        }]);
    }
}
