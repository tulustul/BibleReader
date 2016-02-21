import {Inject, Injectable} from "angular2/core";
import {RouteParams} from "angular2/router";

@Injectable()
export class TranslationsService {
    public enabledTranslations: number[] = [];

    toggleTranslation(translationId: number) {
        let index = this.enabledTranslations.indexOf(translationId);
        if (index !== -1) {
            this.enabledTranslations.splice(index, 1);
        } else {
            this.enabledTranslations.push(translationId);
        }
    }

    prepareEnabled(routeParams: RouteParams) {
        this.enabledTranslations.splice(0, this.enabledTranslations.length);
        let translations: string = routeParams.get("translations");
        if (translations) {
            let translationsArray: number[] = translations.split(",").map(
                id => parseInt(id, 10)
            );
            translationsArray.forEach(
                (tran: number) => this.enabledTranslations.push(tran)
            );
        }
        return this.enabledTranslations;
    }
}
