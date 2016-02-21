import {Component} from "angular2/core";

import {TranslationComponent} from "../../modules/translations/translation.component";
import {PopupDirective} from "../../modules/popup/popup.directive";
import {PopupContentComponent} from "../../modules/popup/popupContent.component";

@Component({
    selector: "verses-translation",
    templateUrl: "app/modules/verses-translation/verses-translation.template.html",
    directives: [TranslationComponent, PopupDirective, PopupContentComponent],
    inputs: ["translation", "versesMerge"],
})
export class VersesTranslationComponent {
    translationsVisible: boolean = false;

    toggleTranslations() {
        this.translationsVisible = !this.translationsVisible;
    }
}
