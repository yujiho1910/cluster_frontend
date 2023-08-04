import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-mapper';

  sharedData: any = {};

  changeData(data: any): void {
    this.sharedData = data;
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}
