import {Component} from "angular2/core";
import {TabComponent} from "./tab.component";

@Component({
    selector: "sidebar",
    templateUrl: "app/modules/sidebar/sidebar.template.html",
})
export class SidebarComponent {

    tabs: TabComponent[] = [];
    activeTab: TabComponent = null;

    addTab(tab:TabComponent) {
        this.tabs.push(tab);
    }

    selectTab(tab:TabComponent) {
        if (this.activeTab) {
            this.activeTab.active = false;
        }
        if (this.activeTab === tab) {
            this.activeTab = null;
        } else {
            this.activeTab = tab;
            this.activeTab.active = true;
        }
    }

}
