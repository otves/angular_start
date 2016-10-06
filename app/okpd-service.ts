import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Okpd } from './okpd';
import { OkpdTree } from './okpd-tree';
//todo: http
import { OKPD_SEARCH_RESULT } from './mocks/okpd-search-result'
import { OKPD_ROOT_TREE } from './mocks/okpd-root-tree'

@Injectable()
export class OkpdService {

  constructor (private http: Http) {}

  ////todo:
  //findFromHttp(query: String) {
  //  return this.http.get(`app/okpd/?search=${query}`).map((r: Response) => r.json().data as Okpd[]);
  //}

  getList(query: String): Promise<Okpd[]> {
    return Promise.resolve(OKPD_SEARCH_RESULT);
  }

  getTree(): Promise<OkpdTree[]> {
    return Promise.resolve(OKPD_ROOT_TREE);
  }



}
