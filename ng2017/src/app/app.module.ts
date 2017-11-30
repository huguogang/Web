import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatTableModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SegmentViewComponent } from './segment-view/segment-view.component';
import { ElementViewComponent } from './element-view/element-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SegmentViewComponent,
    ElementViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
