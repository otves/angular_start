import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import {OkpdSearchComponent} from './okpd-search.component';

@NgModule({
  imports: [ BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    OkpdSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
