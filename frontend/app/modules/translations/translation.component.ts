import {Component} from "angular2/core";
import {Http} from "angular2/http";
import {RouteParams} from "angular2/router";

import {TranslationsService} from "./translations.service";

@Component({
    selector: "translations",
    templateUrl: "app/modules/translations/translations.template.html",
})
export class TranslationComponent {

    translations: any;
    enabledTranslations: any;

    constructor(
        private http: Http,
        private translationsService: TranslationsService,
        private routeParams: RouteParams
    ) {
        // let enabledTranslations = this.routeParams.get("translations");
        // if (enabledTranslations) {
        //     enabledTranslations = enabledTranslations.split(",").map(id => parseInt(id, 10));
        //     translationsService.enabledTranslations = enabledTranslations;
        // }
        this.enabledTranslations = translationsService.enabledTranslations;

        this.http.get("http://localhost:5000/api/v1/translations")
            .subscribe(response => {
                this.translations = response.json().languages;
            });
    }

    toggleTranslation(translation: any) {
        this.translationsService.toggleTranslation(translation.id);
    }

    isTranslationEnabled(translation: any) {
        return this.enabledTranslations.indexOf(translation.id) > -1;
    }
}
