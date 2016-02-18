import {Component} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";

import {TranslationsService} from "./translations.service";

@Component({
    selector: "translations",
    templateUrl: "app/translations/translations.html",
    providers: [HTTP_PROVIDERS],
})
export class TranslationComponent {

    translations: any;
    enabledTranslations: any;

    constructor(
        private http: Http,
        private translationsService: TranslationsService
    ) {
        this.enabledTranslations = translationsService.enabledTranslations;

        this.http.get("http://localhost:5000/api/v1/translations")
            .subscribe(response => {
                this.translations = response.json().languages;
            });
    }

    toggleTranslation(translation: any) {
        this.translationsService.toggleTranslation(translation.id);
    }
}
