import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';

var blackIcon = Leaflet.icon({
  iconUrl: 'assets/black.png',

  iconSize: [30, 30], // size of the icon
});

var blueIcon = Leaflet.icon({
  iconUrl: 'assets/blue.png',

  iconSize: [30, 30], // size of the icon
});

var greenIcon = Leaflet.icon({
  iconUrl: 'assets/green.png',

  iconSize: [30, 30], // size of the icon
});

var purpleIcon = Leaflet.icon({
  iconUrl: 'assets/purple.png',

  iconSize: [30, 30], // size of the icon
});

var redIcon = Leaflet.icon({
  iconUrl: 'assets/red.png',

  iconSize: [30, 30], // size of the icon
});

var centerIcon = Leaflet.icon({
  iconUrl: 'assets/center.png',

  iconSize: [30, 30], // size of the icon
});



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  @Input() coords: any = {};
  keyValuePairs: { key: string; value: any }[] = [];
  centers: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coords']) {
      this.centers = this.coords['centers'];
      let dp = 5;
      for (let index = 0; index < this.centers.length; index++) {
        const element = this.centers[index];
        // to create markers for centers
        const marker = Leaflet.marker(element, { icon: centerIcon }).addTo(
          this.map
        );


        // to round off to 5 decimal places
        this.centers[index] = [
          Math.round((element[0] + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp), 
          Math.round((element[1] + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp)
        ];
      }
      console.log(this.centers)
      this.keyValuePairs = Object.entries(this.coords['values']).map(([key, value]) => ({
        key,
        value,
      }));
      for (let index = 0; index < this.keyValuePairs.length; index++) {
        const element = this.keyValuePairs[index];
        var iconType: any;
        switch (element.value[2]) {
          case 0:
            iconType = redIcon;
            break;
          case 1:
            iconType = blueIcon;
            break;
          case 2:
            iconType = greenIcon;
            break;
          case 3:
            iconType = purpleIcon;
            break;
          case 4:
            iconType = blackIcon;
            break;
          default:
            iconType = null;
            break;
        }
        this.addMarker(
          element.value[0],
          element.value[1],
          element.key,
          iconType
        );
      }
    }
  }

  // leaflet code
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 12,
    center: { lat: -6.1, lng: 107.21 },
  };

  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: -6.1, lng: 107.21 },
        draggable: false,
      },
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>Base Marker</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(
    data: any,
    index: number,
    name: string = 'base marker',
    iconType: any = null
  ) {
    if (iconType === null) {
      return Leaflet.marker(data.position, {
        draggable: data.draggable,
        title: name,
      })
        .on('click', (event) => this.markerClicked(event, index, name))
        .on('dragend', (event) => this.markerDragEnd(event, index));
    } else {
      return Leaflet.marker(data.position, {
        draggable: data.draggable,
        title: name,
        icon: iconType,
      })
        .on('click', (event) => this.markerClicked(event, index, name))
        .on('dragend', (event) => this.markerDragEnd(event, index));
    }
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number, name: string) {
    console.log($event.target.getLatLng(), name);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  addMarker(
    data_lat: number,
    data_lng: number,
    name: string,
    iconType: any = null
  ) {
    const data = {
      position: { lat: data_lat, lng: data_lng },
      draggable: false,
    };
    const marker = this.generateMarker(
      data,
      this.markers.length - 1,
      name,
      iconType
    );
    marker.addTo(this.map).bindPopup(`<b>${name}</b>`);
    this.markers.push(marker);
  }
}
