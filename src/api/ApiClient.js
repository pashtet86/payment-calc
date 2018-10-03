import qs from 'qs';
import axios from 'axios';

export default class ApiClient {
  constructor({ prefix } = {}) {
    this.prefix = prefix;
  }

  // ++++++++++++++++++++++++++++++ GET +++++++++++++++++++++++++++++++
  async get(url, params) {
    const query = params ? `?${qs.stringify(params, { encode: false, skipNulls: true })}` : '';
    const data = await this.request({ url, method: 'GET', query });

    return data;
  }

  // ++++++++++++++++++++++++++++++ POST ++++++++++++++++++++++++++++++
  async post(url, payload) {
    const data = await this.request({ url, method: 'POST', data: { ...payload } });

    return data;
  }

  // ++++++++++++++++++++++++++++++ PUT +++++++++++++++++++++++++++++++++
  async put(url, payload) {
    const data = await this.request({ url, method: 'PUT', data: { ...payload } });

    return data;
  }

  // ++++++++++++++++++++++++++++++ DELETE ++++++++++++++++++++++++++++++
  async delete(url) {
    const data = await this.request({ url, method: 'DELETE' });

    return data;
  }

  async request({
    url, method, query = '', data,
  }) {
    const headers = { Accept: 'application/json' };
    try {
      const authToken = this.authToken ? this.authToken : localStorage.getItem('token');

      if (authToken && authToken.length) {
        headers.Authorization = `Bearer ${authToken}`; // eslint-disable-line
      }

      const options = {
        url: `${this.prefix}/${url}${query}`,
        method,
        data: method !== 'GET' ? qs.stringify(data, { encode: true, skipNulls: true }) : undefined,
        headers,
      };

      const resp = await axios(options);

      return resp.data;
    } catch (error) {
      throw error.response;
    }
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }
}
