import {Injectable} from "angular2/core";

@Injectable()
export class TranslationsService {
    public enabledTranslations: any = [];

    constructor() {
        this.enabledTranslations = [];
    }
    toggleTranslation(translationId: number) {
        let index = this.enabledTranslations.indexOf(translationId);
        if (index !== -1) {
            this.enabledTranslations.splice(index, 1);
        } else {
            this.enabledTranslations.push(translationId);
        }
    }
}
