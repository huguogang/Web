import {Pipe, PipeTransform} from 'angular2/core';

/**
 * Convert device status to proper style.
 */
@Pipe({ name: 'statusStyle' })
export class StatusStylePipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    switch (value.toLowerCase()) {
      case 'healthy':
        return 'success';
      case 'dead':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  }
}