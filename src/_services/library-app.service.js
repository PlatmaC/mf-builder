import { authHeader, handleResponse } from '@/_helpers';
import { API_URL } from '@/_helpers/http-client';

export const libraryAppService = {
  deploy,
  templateManifests,
};

function deploy(identifier) {
  const body = {
    identifier,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/library_apps/`, requestOptions).then(handleResponse);
}

function templateManifests() {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/library_apps/`, requestOptions).then(handleResponse);
}
