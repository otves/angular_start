import { Injectable } from '@angular/core';
import { BackAPI } from './back-api.service';
import { ClassificatorUnited, ClassificatorTree } from './classificator';

@Injectable()
export class OkpdService {

  constructor (private backApi: BackAPI) {}

  getList(query: string): Promise<ClassificatorUnited[]> {
    return this.backApi.okpdBy(query).then(response => response as ClassificatorUnited[]);
  }

  okpdTreeBy(rootCode: string): Promise<ClassificatorTree> {
    return this.backApi.okpdTree(rootCode).then(response => response as ClassificatorTree);
  }

  okpd2TreeBy(rootCode: string): Promise<ClassificatorTree> {
    return this.backApi.okpd2Tree(rootCode).then(response => response as ClassificatorTree);
  }

  tnvedTreeBy(rootCode: string): Promise<ClassificatorTree> {
    return this.backApi.tnvedTree(rootCode).then(response => response as ClassificatorTree);
  }


}
