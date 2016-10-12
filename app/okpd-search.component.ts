import { Component } from '@angular/core';
import { Okpd } from './okpd';
import { OkpdService } from './okpd-service';

@Component({
  moduleId: module.id,
  selector: 'okpd-search',
  styles: [`.demo-tab-group {
    border: 1px solid #e0e0e0;
}

.md-tab-header {
  background: #f9f9f9;
}
.md-tab-body {
  padding: 12px;
}`],
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
