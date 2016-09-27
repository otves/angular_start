import { Component } from '@angular/core';
import { OkpdService } from './okpd-service';

interface TreeNode {
  name:string;
  items?:TreeNode[];
}


const OKPD_TREE = [
  {
    //id: "b",
    name: "РАЗДЕЛ A ПРОДУКЦИЯ СЕЛЬСКОГО, ЛЕСНОГО И РЫБНОГО ХОЗЯЙСТВА ",
    items: [
      {
        name: "01 Продукция и услуги сельского хозяйства и охоты",
        items: [
          {
            name: "01.1 Культуры однолетние"
          }, {
            name: "01.2 Культуры многолетние"
          }, {
            name: "01.3 Материалы растительные: растения живые; луковицы, клубнелуковицы и корневища; отводки и черенки; грибницы"
          },
        ]
      },
      {
        name: "02 Продукция лесоводства, лесозаготовок и связанные с этим услуги"
      },
      {
        name: "03 Рыба и прочая продукция рыболовства и рыбоводства; услуги, связанные с рыболовством и рыбоводством",
      }
    ]
  }

];

@Component({
  selector: 'okpd-tree',
  template: `
    <div>
    <ul>
      <li *ngFor="let item of model" (click)="gotoDetail(item)">
        <span (click)="item.expand=!item.expand" style="cursor: pointer;">
          <i class="fa fa-{{item.expand?'minus':'plus'}}-square-o"></i> {{item.name}}
        </span>
        <div *ngIf="item.expand">
          <ul>
          <li *ngFor="let item2 of item.items" (click)="gotoDetail(item2)">
            <span>{{item.name}}</span>
          </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
  `,
  providers: [OkpdService]
})
export class OkpdTreeComponent {


  model:TreeNode[] = OKPD_TREE;

  constructor(private okpdService:OkpdService) {

  }


  gotoDetail(okpd:Object) {
    //this.okpdService.find(this.model.query).then(res => this.model.result = res);
  }

}
