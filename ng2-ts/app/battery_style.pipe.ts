
import {Pipe, PipeTransform} from 'angular2/core';

/**
 * Convert battery level to proper style.
 */
@Pipe({ name: 'batteryStyle' })
export class BatteryStylePipe implements PipeTransform {
  transform(value: number, args: string[]): string {
    if(value > 40) {
      return "success";
    }
    else if(value > 10) {
      return "warning";
    }
    else {
      return "danger";
    }
  }
}