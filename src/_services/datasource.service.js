import { authHeader, handleResponse } from '@/_helpers';
import { getMockAppId } from '../_helpers/mockAppId';
import { API_URL } from '@/_helpers/http-client';

export const datasourceService = {
  create,
  getAll,
  deleteDataSource,
  test,
  setOauth2Token,
  save,
  fetchOauth2BaseUrl,
};

function getAll(appVersionId) {
  appVersionId = getMockAppId();

  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    credentials: 'include',
  };
  let searchParams = new URLSearchParams(`app_id=${appVersionId}`);
  return fetch(`${API_URL}/data_sources?` + searchParams, requestOptions).then(handleResponse);
}

function create({ plugin_id, name, kind, options, app_id, app_version_id }) {
  const body = {
    plugin_id,
    name,
    kind,
    options,
    app_id,
    app_version_id,
  };

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_sources`, requestOptions).then(handleResponse);
}

function save({ id, name, options, app_id }) {
  const body = {
    name,
    options,
    app_id,
  };

  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_sources/${id}`, requestOptions).then(handleResponse);
}

function deleteDataSource(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
    credentials: 'include',
  };
  return fetch(`${API_URL}/data_sources/${id}`, requestOptions).then(handleResponse);
}

function test(kind, options, plugin_id) {
  const body = {
    kind,
    options,
    plugin_id,
  };

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_sources/test_connection`, requestOptions).then(handleResponse);
}

function setOauth2Token(dataSourceId, body, current_organization_id) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(false, current_organization_id),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_sources/${dataSourceId}/authorize_oauth2`, requestOptions).then(handleResponse);
}

function fetchOauth2BaseUrl(provider) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({ provider }),
  };
  return fetch(`${API_URL}/data_sources/fetch_oauth2_base_url`, requestOptions).then(handleResponse);
}
