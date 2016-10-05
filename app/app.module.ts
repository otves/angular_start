import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {MaterialModule} from '@angular/material';
import { AppComponent }  from './app.component';
import { OkpdSearchComponent } from './okpd-search.component';
import { OkpdTreeComponent } from './okpd-tree.component';
import { OkpdService } from './okpd-service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule,  MaterialModule.forRoot()],
  declarations: [
    AppComponent,
    OkpdSearchComponent,
    OkpdTreeComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    OkpdService
  ],
})
export class AppModule {
}
