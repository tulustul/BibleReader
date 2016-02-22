import {Component} from "angular2/core";
import {RouteParams} from "angular2/router";

import {TranslationComponent} from "../../modules/translations/translation.component";
import {PopupDirective} from "../../modules/popup/popup.directive";
import {PopupContentComponent} from "../../modules/popup/popupContent.component";

@Component({
    selector: "verses-translation",
    templateUrl: "app/modules/verses-translation/verses-translation.template.html",
    directives: [TranslationComponent, PopupDirective, PopupContentComponent],
    inputs: ["translation", "versesMerge", 'chapter'],
})
export class VersesTranslationComponent {
    translationsVisible: boolean = false;
    verseNumber: number;

    constructor(private routeParams: RouteParams) {
        this.verseNumber = parseInt(
            routeParams.get('query').split(':')[1]
        );
    }

    toggleTranslations() {
        this.translationsVisible = !this.translationsVisible;
    }
}
