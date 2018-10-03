import Base from './Base';

export default class extends Base {
  async getCurrencies(url, query = '') {
    const data = await this.apiClient.get(url, query);

    return data;
  }

}
