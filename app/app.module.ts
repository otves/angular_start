import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { OkpdSearchComponent } from './okpd-search.component';
import { HttpModule }    from '@angular/http';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    OkpdSearchComponent,
    HttpModule
  ],
  bootstrap: [AppComponent],
  providers: [
    OkpdService
  ],
})
export class AppModule {
}
