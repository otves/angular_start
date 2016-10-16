import { Component } from '@angular/core';
import { ClassificatorTreeComponent } from './components/classificator-tree/classificator-tree.component';

@Component({
  moduleId: module.id,
  selector: 'classificators-tree',
  template: `
    <md-tab-group class="demo-tab-group">

    <md-tab>
      <template md-tab-label>ОКПД</template>
      <template md-tab-content>
        <classificator-tree [type]="okpd"></classificator-tree>
      </template>
    </md-tab>

    <md-tab>
      <template md-tab-label>ОКПД2</template>
      <template md-tab-content>
        <classificator-tree [type]="okpd2"></classificator-tree>
      </template>
    </md-tab>

    <md-tab>
      <template md-tab-label>ТНВЭД</template>
      <template md-tab-content>
         <classificator-tree [type]="tnved"></classificator-tree>
      </template>
    </md-tab>

  </md-tab-group>
    `
})
export class ClassificatorsTreeComponent {


}
