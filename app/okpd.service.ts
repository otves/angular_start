import { Injectable } from '@angular/core';
import { BackAPI } from './back-api.service';
import { Okpd } from './okpd';
import { ClassificatorTree } from './classificator-tree';

@Injectable()
export class OkpdService {

  constructor (private backApi: BackAPI) {}

  getList(query: String): Promise<Okpd[]> {
    return this.backApi.okpdBy().then(response => response as Okpd[]);
  }

  treeBy(rootCode: String): Promise<ClassificatorTree> {
    return this.backApi.okpdTree(rootCode).then(response => response as ClassificatorTree);
  }


}
