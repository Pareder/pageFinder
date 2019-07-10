import axios from 'axios';
import config from '../config';

class API {
  constructor(axios, config) {
    this._axios = axios;
    this._config = config;
  }

  static createFrom() {
    return new API(axios, config);
  }

  async getPages(searchQueries, searchWord) {
    const pages = await this._axios.post(`${this._config.apiServer}/getPages`, {
      queries: searchQueries,
      searchWord: searchWord,
    });

    return pages.data.data;
  }
}

export default API;
