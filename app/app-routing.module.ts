import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OkpdSearchComponent } from './okpd-search.component';
import { ClassificatorsTreeComponent } from './classificators-tree.component';

const routes: Routes = [
  {
    path: 'search',
    component: OkpdSearchComponent
  },
  {
    path: 'tree',
    component: ClassificatorsTreeComponent
  },
  {path: '', redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

