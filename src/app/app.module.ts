import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CesiumViewerComponent } from './cesium-viewer/cesium-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    CesiumViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
