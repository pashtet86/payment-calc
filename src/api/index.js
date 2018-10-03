import ApiClient from './ApiClient';
import Main from './Main';

const apiPrefix = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/'; // eslint-disable-line

function apiFactory(prefix) {
  if (!prefix) {
    throw new Error('[apiPrefix] required');
  }

  const api = new ApiClient({ prefix });

  return {
    ApiClient: api,
    main: new Main({ apiClient: api }),
  };
}

export default apiFactory(apiPrefix);
