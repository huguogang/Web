import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http'
// Without this import, will get error message:
//   EXCEPTION: TypeError: x.map is not a function in [null]
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable';

export interface DeviceSummary {
  status: string;
  count: number;
}

@Injectable()
export class DeviceService {
  deviceSummary: DeviceSummary[];

  constructor(private _http: Http) {
    console.log("_http in DeviceService", this._http);
  }

  getDeviceSummary(): Observable<DeviceSummary[]> {
    return this._http.get("/data/device_summary.json")
      .map(response => response.json())
  }
  getDevice(id: string) {

  }
}