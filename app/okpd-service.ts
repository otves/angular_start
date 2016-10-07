import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Okpd } from './okpd';
import { OkpdTree } from './okpd-tree';

@Injectable()
export class OkpdService {

  constructor (private http: Http) {}

  getList(query: String): Promise<Okpd[]> {
    return this.http.get(`api/okpdSearch?q=${query}`)
      .toPromise()
      .then(response => response.json().data as Okpd[])
      .catch(this.handleError);
  }

  getTree(): Promise<OkpdTree[]> {
    return this.http.get(`api/okpdTree`)
      .toPromise()
      .then(response => response.json().data as Okpd[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }



}
