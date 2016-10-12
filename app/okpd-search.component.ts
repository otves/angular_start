import { Component } from '@angular/core';
import { Okpd } from './okpd';
import { OkpdService } from './okpd.service';

@Component({
  moduleId: module.id,
  selector: 'okpd-search',
  styleUrls: ['okpd-search.css'],
  templateUrl: 'okpd-search.html',
  providers: [OkpdService]
})
export class OkpdSearchComponent {

  model:{
    query: string,
    result: Okpd[]
  } = {query: "", result: []};

  constructor(private okpdService:OkpdService) {
  }


  search() {
    this.okpdService.getList(this.model.query).then(res => this.model.result = res);
  }

}
