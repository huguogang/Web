import {Component} from 'angular2/core';

import {WikiPromiseService} from './wiki_promise.service';

@Component({
  selector: 'my-wiki-promise',
  templateUrl: 'app/wiki_promise.component.html',
  providers: [WikiPromiseService]
})
export class WikiPromiseComponent {
  items: Array<string>;
  
  constructor(private _wikiPromiseService: WikiPromiseService) {}

  search(term: String) {
    this._wikiPromiseService.search(term).then((items) => this.items = items);
  }
}