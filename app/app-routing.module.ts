import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OkpdSearchComponent } from './okpd-search.component';
import { OkpdTreeComponent } from './okpd-tree.component';

const routes: Routes = [
  {
    path: 'search',
    component: OkpdSearchComponent
  },
  {
    path: 'tree',
    component: OkpdTreeComponent
  },
  {path: '', redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

