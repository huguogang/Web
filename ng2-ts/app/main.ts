import {enableProdMode} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS } from 'angular2/router';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';

enableProdMode();
bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, JSONP_PROVIDERS])
  .catch(err => console.error(err));