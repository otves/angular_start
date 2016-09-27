import { Component } from '@angular/core';
import { Okpd } from './okpd';
import { OkpdService } from './okpd-service';

@Component({
  selector: 'okpd-search',
  template: `<md-card> Поиск по ОКПД
  <md-input [(ngModel)]="model.query" placeholder="Полнотекстовый поиск" ></md-input> <button (click)="search()">Искать</button>
  <table  *ngIf="model.result && model.result.length > 0">
    <tr>
        <th>Код</th>
        <th>Наименование</th>
        <th>Связи</th>
      </tr>

     <tr *ngFor="let okpd of model.result" >
        <td>{{okpd.okpd}}</td>
        <td>{{okpd.name}}</td>
        <td>{{okpd.okpd2}}<br>{{okpd.tnved}}</td>
      </tr>
</table>
</md-card>
  `,
  providers: [OkpdService]
})
export class OkpdSearchComponent {

  model:{
    query: string,
    result: Okpd[]
  } = {query:"", result:[]};

  constructor(private okpdService:OkpdService) {
  }


  search() {
    this.okpdService.find(this.model.query).then(res => this.model.result = res);
  }

}
