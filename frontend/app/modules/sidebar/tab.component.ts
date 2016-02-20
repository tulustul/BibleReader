import {Component} from "angular2/core";
import {SidebarComponent} from "./sidebar.component";

@Component({
    selector: "tab",
    templateUrl: "app/modules/sidebar/tab.template.html",
    inputs: ["title"],
})
export class TabComponent {

    active: boolean = false;

    constructor(sidebar: SidebarComponent) {
        sidebar.addTab(this);
    }
}
