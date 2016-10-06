import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OkpdService } from './okpd-service';
import { OkpdTree } from './okpd-tree';


@Component({
  selector: 'okpd-tree',
  template: `
    <md-card>
    <ul>
      <li *ngFor="let item of model" (click)="gotoDetail(item)">
        <span (click)="item.expand=!item.expand" style="cursor: pointer;">
          <i class="fa fa-{{item.expand?'minus':'plus'}}-square-o"></i> {{item.name}}
        </span>
        <div *ngIf="item.expand">
          <ul>
          <li *ngFor="let item2 of item.items" (click)="gotoDetail(item2)">
            <span>{{item2.name}}</span>
          </li>
          </ul>
        </div>
      </li>
    </ul>
  </md-card>
  `,
  providers: [OkpdService]
})
export class OkpdTreeComponent implements OnInit {


  model:OkpdTree[];

  constructor(private okpdService:OkpdService) {

  }

  ngOnInit(): void {
    this.okpdService.getTree().then(res => this.model = res);
  }


  gotoDetail(okpd: Object) {
    //this.okpdService.find(this.model.query).then(res => this.model.result = res);
  }

}
