import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';



var greenIcon = Leaflet.icon({
  iconUrl: 'assets/leaf-green.png',
  shadowUrl: 'assets/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var redIcon = Leaflet.icon({
  iconUrl: 'assets/leaf-red.png',
  shadowUrl: 'assets/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var orangeIcon = Leaflet.icon({
  iconUrl: 'assets/leaf-orange.png',
  shadowUrl: 'assets/leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  @Input() coords: any = {};
  keyValuePairs: { key: string; value: any}[] = []

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coords']) {
      this.keyValuePairs = Object.entries(this.coords).map(([key, value]) => ({ key, value }));
      for (let index = 0; index < this.keyValuePairs.length; index++) {
        const element = this.keyValuePairs[index];
        var iconType: any;
        switch (element.value[2]) {
          case 0:
            iconType = greenIcon;
            // iconType = null;
            break;
          case 1:
            iconType = redIcon;
            break;
          case 2:
            iconType = orangeIcon;
            break;
          default:
            iconType = null;
            break;
        }
        console.log(element.value[2])
        this.addMarker(element.value[0], element.value[1], element.key, iconType);
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
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker
        .addTo(this.map)
        .bindPopup(`<b>Base Marker</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(data: any, index: number, name: string = 'base marker', iconType: any = null ) {
    if (iconType === null) {
      return Leaflet.marker(data.position, { draggable: data.draggable, title: name  })
      .on('click', (event) => this.markerClicked(event, index, name))
      .on('dragend', (event) => this.markerDragEnd(event, index));
    }
    else {
      return Leaflet.marker(data.position, { draggable: data.draggable, title: name, icon: iconType  })
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

  addMarker(data_lat: number, data_lng: number, name: string, iconType: any = null) {
    const data = {
      position: { lat: data_lat, lng: data_lng },
      draggable: true
    }
    const marker = this.generateMarker(data, this.markers.length - 1, name, iconType);
    marker.addTo(this.map).bindPopup(`<b>${name}</b>`);
    this.markers.push(marker);
  }
}
