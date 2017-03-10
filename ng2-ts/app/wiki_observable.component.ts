import {Control} from 'angular2/common';
import {Component} from 'angular2/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import {WikiObservableService} from './wiki_observable.service';

@Component({
  selector: 'my-wiki-observable',
  templateUrl: 'app/wiki_observable.component.html',
  providers: [WikiObservableService]
})
export class WikiObservableComponent {
  items: Observable<Array<string>>;
  // TODO: the control is not wired correctly
  term: Control = new Control();

  constructor(private _wikiObservableService: WikiObservableService) {
    this.items = this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((term: string) => this._wikiObservableService.search(term));
  }
}