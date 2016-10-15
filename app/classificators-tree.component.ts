import { Component } from '@angular/core';
import { ClassificatorTreeComponent } from './components/classificator-tree/classificator-tree.component';

@Component({
  moduleId: module.id,
  selector: 'classificators-tree',
  template: `
    <ul>
      <li>
        ОКПД
        <classificator-tree></classificator-tree>
      </li>
    </ul>`
})
export class ClassificatorsTreeComponent {


}
