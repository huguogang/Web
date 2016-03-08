import {Component, OnInit} from 'angular2/core';

import {DeviceSummary, DeviceService} from './device.service';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-device',
  templateUrl: 'app/device.component.html',
  providers: [DeviceService]
})
export class DeviceComponent implements OnInit {
  deviceSummary: DeviceSummary[];

  constructor(private _deviceService: DeviceService) { }

  ngOnInit() {
    this.getDeviceSummary();
  }

  getDeviceSummary() {
    this._deviceService.getDeviceSummary()
      .subscribe(
      (deviceSummary: DeviceSummary[]) => { this.deviceSummary = deviceSummary; }
      );
  }
}