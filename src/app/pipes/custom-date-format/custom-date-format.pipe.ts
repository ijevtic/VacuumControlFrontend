import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return '';

    const date = new Date(value * 1000); // Convert UNIX timestamp to milliseconds
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so adding 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `[${this.formatNumber(day)}.${this.formatNumber(month)}.${year}. ${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)}]`;
  }

  private formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
