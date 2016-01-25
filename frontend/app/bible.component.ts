import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, URLSearchParams} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {SearchboxComponent} from './searchbox/searchbox.component';
import {TranslationComponent} from './translations/translation.component';
import {TranslationsService} from './translations/translations.service';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {VersesComponent} from './verses/verses.component';

@Component({
    selector: 'bible',
    templateUrl: 'app/bible.html',
    providers: [HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, SearchboxComponent, TranslationComponent],
})
@RouteConfig([
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
    }, {
        path: '/verses/:translations/:query',
        name: 'Verses',
        component: VersesComponent,
    }, {
        path: '/search/:translations/:query',
        name: 'Search',
        component: SearchComponent,
    }
])
export class BibleComponent {

    results: any;

    constructor(
        private http: Http,
        private translationsService: TranslationsService
    ) { }

    search(searchTerm: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('t', this.translationsService.enabledTranslations);

        this.http.get(
            `http://localhost:5000/api/v1/search/${searchTerm}?`, {
                search: params,
            }
        ).subscribe(response => {
            this.results = response.json();
        });
    }
}
