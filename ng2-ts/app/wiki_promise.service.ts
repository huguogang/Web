import {Injectable} from 'angular2/core';
import {URLSearchParams, Jsonp} from 'angular2/http';

@Injectable()
export class WikiPromiseService {
  constructor(private jsonp: Jsonp) { }

  search(term: String) {
    let wikiSearchUrl = 'http://en.wikipedia.org/w/api.php';

    var searchParams = new URLSearchParams();
    searchParams.set('action', 'opensearch');
    searchParams.set('search', term);
    searchParams.set('format', 'json');
    searchParams.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
      .get(wikiSearchUrl, {search: searchParams})
      .toPromise()
      //.then((response) => console.log(response.json()[1])); 
      .then((response) => response.json()[1]);
  }
}