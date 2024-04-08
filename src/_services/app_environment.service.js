import { authHeader, handleResponse } from '@/_helpers';
import { API_URL } from '@/_helpers/http-client';

export const appEnvironmentService = {
  getAllEnvironments,
};

function getAllEnvironments() {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/app-environments`, requestOptions).then(handleResponse);
}
