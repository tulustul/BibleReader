import {Directive, Input} from "angular2/core";
import {TemplateRef, ViewContainerRef} from "angular2/core";

@Directive({
    selector: "[bibPopup]",
    providers: [TemplateRef, ViewContainerRef],
})
export class PopupDirective {

    constructor(
        private _templateRef: TemplateRef,
        private _viewContainer: ViewContainerRef
    ) {
        this._viewContainer.createEmbeddedView(this._templateRef);
    }

}
