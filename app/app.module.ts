import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent }  from './app.component';
import { OkpdSearchComponent } from './okpd-search.component';
import { OkpdTreeComponent } from './okpd-tree.component';
import { OkpdService } from './okpd-service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { MockDatabaseService }  from './mock-database.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(MockDatabaseService, {
      delay: 100,  rootPath: 'api/'
    }),
    MaterialModule.forRoot()
  ],
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
