import {Component, AfterViewChecked, OnChanges, ElementRef} from "angular2/core";
import {Http, HTTP_PROVIDERS, URLSearchParams} from "angular2/http";
import {OnActivate, RouteParams} from "angular2/router";


import {TranslationsService} from "../../modules/translations/translations.service";
import {VersesTranslationComponent} from "../../modules/verses-translation/verses-translation.component";

@Component({
    selector: "page-verses",
    templateUrl: "app/pages/verses/verses.template.html",
    providers: [HTTP_PROVIDERS],
    directives: [VersesTranslationComponent],
})
export class VersesComponent implements OnActivate, OnChanges, OnInit {

    results: any;

    versesMerge: boolean = false;

    constructor(
        private http: Http,
        private routeParams: RouteParams,
        private translationsService: TranslationsService,
        private elementRef: ElementRef
    ) {
        let params: URLSearchParams = new URLSearchParams();
        params.set("t", this.routeParams.get("translations"));
        let verseQuery = this.routeParams.get("query");

        this.http.get(
            `http://localhost:5000/api/v1/verses/${verseQuery}?`, {
                search: params,
            }
        ).subscribe(response => {
            this.results = response.json();
        });
    }

    toggleVersesMerge() {
        this.versesMerge = !this.versesMerge;
    }

    routerOnActivate() {
        this.translationsService.prepareEnabled(this.routeParams);
    }

    ngOnChanges(changes) {
        console.log(changes);
    }

    ngAfterViewChecked() {
        let translations = this.elementRef.nativeElement.querySelectorAll(
            '.verses-translation'
        );
        if (translations.length === 0) {
            return;
        }
        let tran_verses = [];
        for (var i = translations.length - 1; i >= 0; i--) {
            tran_verses.push(translations[i].querySelectorAll('li'));
        }
        if (tran_verses.length === 0) {
            return;
        }
        for (var i = tran_verses[0].length - 1; i >= 0; i--) {
            let row: number[] = [];
            for (var j = tran_verses.length - 1; j >= 0; j--) {
                row.push(tran_verses[j][i].offsetHeight);
            }
            let height = Math.max(...row) + 'px';
            for (var j = tran_verses.length - 1; j >= 0; j--) {
                tran_verses[j][i].style.height = height;
            }
        }
    }
}
