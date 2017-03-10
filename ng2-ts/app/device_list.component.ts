import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {BatteryStylePipe} from './battery_style.pipe'
import {Device, DeviceService} from './device.service';
import {StatusStylePipe} from './status_style.pipe'

@Component({
  selector: 'my-device-list',
  templateUrl: 'app/device_list.component.html',
  providers: [DeviceService],
  pipes: [BatteryStylePipe, StatusStylePipe]
})
export class DeviceListComponent implements OnInit {
  devices: Device[];
  status: string;
  
  constructor(private _deviceService: DeviceService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    this.status = this._routeParams.get('status');
    this.getDeviceList(this.status);
  }

  getDeviceList(status: string) {
    this._deviceService.getDeviceListByStatus(status)
      .subscribe(
      (devices: Device[]) => { this.devices = devices; }
      );
  }
}