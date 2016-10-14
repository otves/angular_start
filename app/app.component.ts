import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `<h1>___</h1>
   <nav>
     <a routerLink="/tree">tree</a>
     <a routerLink="/search">search</a>
   </nav>
   <router-outlet></router-outlet>`
})
export class AppComponent { }
