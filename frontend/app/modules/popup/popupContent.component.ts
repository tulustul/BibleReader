import {Component} from "angular2/core";

import {PopupDirective} from './popup.directive';

@Component({
    selector: "popup-content",
    templateUrl: "app/modules/popup/popup.template.html",
    providers: [PopupDirective],
})
export class PopupContentComponent {

    isVisible: boolean = false;

    // constructor(popup: PopupDirective) {
    //     popup.setContent(this);
    // }

    constructor() {

    }
}
