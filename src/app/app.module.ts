import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { InputPageComponent } from './input-page/input-page.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, MapComponent, InputPageComponent, NavbarComponent],
  imports: [BrowserModule, LeafletModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
