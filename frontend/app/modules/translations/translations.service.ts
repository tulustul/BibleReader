import {Inject, Injectable} from "angular2/core";

@Injectable()
export class TranslationsService {
    public enabledTranslations: number[] = [];

    // constructor() {
    //     this.enabledTranslations = [];
    // }

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
        let enabledTranslations = routeParams.get("translations");
        if (enabledTranslations) {
            enabledTranslations = enabledTranslations.split(",").map(id => parseInt(id, 10));
            enabledTranslations.forEach(tran => this.enabledTranslations.push(tran));
        }
        return this.enabledTranslations;
    }
}
