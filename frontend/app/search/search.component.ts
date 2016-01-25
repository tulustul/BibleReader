import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, URLSearchParams} from 'angular2/http';
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.html',
    providers: [HTTP_PROVIDERS],
})
export class SearchComponent {

    results: any;

    constructor(
        private http: Http,
        private routeParams: RouteParams,
    ) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('t', this.routeParams.get('translations'));

        let searchQuery = this.routeParams.get('query');

        this.http.get(
            `http://localhost:5000/api/v1/search/${searchQuery}?`, {
                search: params,
            }
        ).subscribe(response => {
            this.results = response.json();
        });
    }
}
