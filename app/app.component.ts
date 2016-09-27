import { Component } from '@angular/core';
import { OkpdSearchComponent } from './okpd-search.component';
import { OkpdTreeComponent } from './okpd-tree.component';

@Component({
  selector: 'app',
  template: `<okpd-search></okpd-search><br><okpd-tree></okpd-tree>`
})
export class AppComponent { }
