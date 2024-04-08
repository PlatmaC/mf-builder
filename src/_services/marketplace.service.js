import HttpClient, { API_URL } from '@/_helpers/http-client';

const adapter = new HttpClient({ host: API_URL.replace('/api', '') });

function findAll() {
  return adapter.get(`/assets/marketplace/plugins.json`);
}

export const marketplaceService = {
  findAll,
};
