import { authHeader, handleResponse } from '@/_helpers';
import { getMockAppId } from '../_helpers/mockAppId';
import { API_URL } from '@/_helpers/http-client';

export const dataqueryService = {
  create,
  getAll,
  run,
  update,
  del,
  preview,
  changeQueryDataSource,
};

function getAll(appVersionId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    credentials: 'include',
  };

  appVersionId = getMockAppId();

  let searchParams = new URLSearchParams(`app_id=${appVersionId}`);
  return fetch(`${API_URL}/data_queries?` + searchParams, requestOptions).then(handleResponse);
}

function create(app_id, app_version_id, name, kind, options, data_source_id, plugin_id) {
  const body = {
    app_id,
    app_version_id,
    name,
    kind,
    options,
    data_source_id: kind === 'runjs' || kind === 'runpy' ? null : data_source_id,
    plugin_id,
  };

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_queries`, requestOptions).then(handleResponse);
}

function update(id, name, options) {
  const body = {
    options,
    name,
  };

  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_queries/${id}`, requestOptions).then(handleResponse);
}

function del(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
    credentials: 'include',
  };
  return fetch(`${API_URL}/data_queries/${id}`, requestOptions).then(handleResponse);
}

function run(queryId, options) {
  const body = {
    options: options,
  };

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_queries/${queryId}/run`, requestOptions).then(handleResponse);
}

function preview(query, options, versionId) {
  const body = {
    query,
    options: options,
    app_version_id: versionId,
  };

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(`${API_URL}/data_queries/preview`, requestOptions).then(handleResponse);
}

function changeQueryDataSource(id, dataSourceId) {
  const body = {
    data_source_id: dataSourceId,
  };
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(body),
    credentials: 'include',
  };
  return fetch(`${API_URL}/data_queries/${id}/data_source`, requestOptions).then(handleResponse);
}
