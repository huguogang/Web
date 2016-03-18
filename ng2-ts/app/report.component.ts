import {Component, OnInit, Renderer} from 'angular2/core';

import {Device, DeviceService} from './device.service';

declare var google: any; // External Javascript object

@Component({
  selector: 'my-report',
  templateUrl: 'app/report.component.html',
  providers: [DeviceService]
})
export class ReportComponent implements OnInit {
  devices: Device[];

  constructor(private _deviceService: DeviceService,
    private _renderer: Renderer) { }

  ngOnInit() {
    this.getDeviceList("healthy");

  }

  getDeviceList(status: string) {
    this._deviceService.getDeviceListByStatus(status)
      .subscribe((devices: Device[]) =>
      { this.devices = devices;
        this.showMap() });
  }

  showMap() {
    // Create a map object and specify the DOM element for display.
    var targetEle = this._renderer.selectRootElement(".map");
    var map = new google.maps.Map(targetEle, {
      center: { lat: 37.3275, lng: -122.1419 },
      scrollwheel: false,
      zoom: 8
    });
    this.devices.forEach(device => {
      var batteryStyle = this.calculateBatteryStyle(device.BatteryLevel);
      var infoContent = `
      <h1>Information</h1>
      <table class="table table-striped table-hover table-bordered">
      <tr><td><b>ID</b></td><td>${device.ID}</td></tr>
      <tr><td><b>Firmware Version</b></td><td>${device.FirmwareVersion}</td></tr>
      <tr><td><b>Software Version</b></td><td>${device.HardwareVersion}</td></tr>
      <tr>
        <td><b>Battery Level</b></td>
        <td><span class="label label-${batteryStyle}">${device.BatteryLevel}</span></td>
      </tr>
      </table>
      `;
      var infowindow = new google.maps.InfoWindow({
        content: infoContent
      });

      var marker = new google.maps.Marker({
        position: { lat: device.LAT, lng: device.LON },
        map: map,
        title: 'Hello World!'
      });
      
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  }
  
  calculateBatteryStyle(batteryLevel: number): string {
    if(batteryLevel > 40) {
      return "success";
    }
    else if(batteryLevel > 10) {
      return "warning";
    }
    else {
      return "danger";
    }
  }
}