import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Observable} from 'rxjs/Observable';

import {DeviceSummary, DeviceService} from './device.service';
import {StatusStylePipe} from './status_style.pipe'

@Component({
  selector: 'my-device',
  templateUrl: 'app/device.component.html',
  providers: [DeviceService],
  pipes: [StatusStylePipe]
})
export class DeviceComponent implements OnInit {
  deviceSummary: DeviceSummary[];

  constructor(private _deviceService: DeviceService, private _router: Router) { }

  ngOnInit() {
    this.getDeviceSummary();
  }

  getDeviceSummary() {
    this._deviceService.getDeviceSummary()
      .subscribe(
      (deviceSummary: DeviceSummary[]) => { this.deviceSummary = deviceSummary; }
      );
  }
  
  onSelect(deviceSummary : DeviceSummary) {
    // alert(JSON.stringify(deviceSummary));
    this._router.navigate(["DeviceList", {status: deviceSummary.status} ]);
  }
}