import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `<h1>ОКПД Маркет</h1>
   <nav>
     <a routerLink="/tree">Дерево</a>
     <a routerLink="/search">Полнотекстовый поиск</a>
   </nav>
   <md-card>
       <router-outlet></router-outlet>
   </md-card>
`,
})
export class AppComponent { }
