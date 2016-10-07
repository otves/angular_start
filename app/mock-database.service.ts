import { InMemoryDbService } from 'angular2-in-memory-web-api';

import { OKPD_SEARCH_RESULT } from './mocks/okpd-search-result'
import { OKPD_ROOT_TREE } from './mocks/okpd-root-tree'

export class MockDatabaseService implements InMemoryDbService {

  createDb() {
    return {'okpdTree': OKPD_ROOT_TREE, 'okpdSearch' : OKPD_SEARCH_RESULT};
  }

}
