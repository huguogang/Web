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

export interface Device {
  ID: string;
  FirmwareVersion: string;
  HardwareVersion: string;
  LAT: number;
  LON: number;
  // Battery percentage [0 - 100]
  BatteryLevel: number;
}

@Injectable()
export class DeviceService {
  deviceSummary: DeviceSummary[];

  constructor(private _http: Http) {
  }

  getDeviceSummary(): Observable<DeviceSummary[]> {
    return this._http.get("/data/device_summary.json")
      .map(response => response.json())
  }
  getDeviceListByStatus(status: string): Observable<Device[]> {
    return this._http.get("/data/" + status.toLowerCase() + "_devices.json")
      .map(response => response.json())
  }
}