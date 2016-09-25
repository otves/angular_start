import { Injectable } from '@angular/core';
import { Okpd } from './okpd';
import { OKPD_SEARCH_RESULT } from './mocks/okpd-search-result'

@Injectable()
export class OkpdService {

  find(query: String): Promise<Okpd[]> {
    return Promise.resolve(OKPD_SEARCH_RESULT);
  }

}
