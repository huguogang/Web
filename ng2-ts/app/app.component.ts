import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {DeviceComponent} from "./device.component"
import {DeviceListComponent} from "./device_list.component"
import {ReportComponent} from "./report.component"
import {WikiPromiseComponent} from './wiki_promise.component'
import {WikiObservableComponent} from './wiki_observable.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {
    path: '/device',
    name: "Device",
    component: DeviceComponent,
    useAsDefault: true
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportComponent
  },
  {
    path: '/device_list',
    name: "DeviceList",
    component: DeviceListComponent
  },
  {
    path: '/wiki_promise',
    name: 'WikiPromise',
    component: WikiPromiseComponent
  },
  {
    path: '/wiki_observable',
    name: 'WikiObservable',
    component: WikiObservableComponent
  }
])
export class AppComponent {
  title = 'Title';
}