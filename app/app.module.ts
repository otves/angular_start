import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent }  from './app.component';
import { OkpdSearchComponent } from './okpd-search.component';
import { ClassificatorsTreeComponent } from './classificators-tree.component';
import { ClassificatorTreeComponent } from './components/classificator-tree/classificator-tree.component';
import { OkpdService } from './okpd.service';
import { BackAPI } from './back-api.service';
import { AppRoutingModule }     from './app-routing.module';
import { TreeViewComponent } from './components/classificator-tree/tree-veiw.component';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { MockDatabaseService }  from './mock-database.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    //InMemoryWebApiModule.forRoot(MockDatabaseService, {
    //  delay: 100,  rootPath: 'api/'
    //}),
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    OkpdSearchComponent,
    ClassificatorsTreeComponent,
    ClassificatorTreeComponent,
    TreeViewComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    BackAPI,
    OkpdService
  ]
})
export class AppModule {
}
