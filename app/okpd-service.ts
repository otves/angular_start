import { Injectable } from '@angular/core';
import { Okpd } from './okpd';
import { Http, Response } from '@angular/http';
import { OKPD_SEARCH_RESULT } from './mocks/okpd-search-result'

@Injectable()
export class OkpdService {

  constructor (private http: Http) {}

  ////todo:
  //findFromHttp(query: String) {
  //  return this.http.get(`app/okpd/?search=${query}`).map((r: Response) => r.json().data as Okpd[]);
  //}

  find(query: String): Promise<Okpd[]> {
    return Promise.resolve(OKPD_SEARCH_RESULT);
  }

}
