import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vacuumStatus'
})
export class VacuumStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
