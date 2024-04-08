import { authHeader, handleResponse } from '@/_helpers';
import { API_URL } from '@/_helpers/http-client';

export const appService = {
  getConfig,
  getAll,
  createApp,
  cloneApp,
  exportApp,
  importApp,
  changeIcon,
  deleteApp,
  getApp,
  getAppBySlug,
  getAppByVersion,
  saveApp,
  getAppUsers,
  createAppUser,
  setVisibility,
  setMaintenance,
  setSlug,
  setPasswordFromToken,
  acceptInvite,
  getVersions,
};

function getConfig() {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/config`, requestOptions).then(handleResponse);
}

function getAll(page, folder, searchKey) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  if (page === 0) return fetch(`${API_URL}/apps`, requestOptions).then(handleResponse);
  else
    return fetch(`${API_URL}/apps?page=${page}&folder=${folder || ''}&searchKey=${searchKey}`, requestOptions).then(
      handleResponse
    );
}

function createApp(body = {}) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/apps`, requestOptions).then(handleResponse);
}

function cloneApp(id) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${id}/clone`, requestOptions).then(handleResponse);
}

function exportApp(id, versionId) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${id}/export${versionId ? `?versionId=${versionId}` : ''}`, requestOptions).then(
    handleResponse
  );
}

function getVersions(id) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${id}/versions`, requestOptions).then(handleResponse);
}

function importApp(body) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/apps/import`, requestOptions).then(handleResponse);
}

function changeIcon(icon, appId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({ icon }),
  };
  return fetch(`${API_URL}/apps/${appId}/icons`, requestOptions).then(handleResponse);
}

function getApp(id, accessType) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${id}${accessType ? `?access_type=${accessType}` : ''}`, requestOptions).then(
    handleResponse
  );
}

function deleteApp(id) {
  const requestOptions = { method: 'DELETE', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${id}`, requestOptions).then(handleResponse);
}

function getAppBySlug(slug) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${slug}`, requestOptions).then(handleResponse);
}

function getAppByVersion(appId, versionId) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${appId}/versions/${versionId}`, requestOptions).then(handleResponse);
}

function saveApp(id, attributes) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({
      app: attributes,
    }),
  };
  return fetch(`${API_URL}/apps/${id}`, requestOptions).then(handleResponse);
}

function getAppUsers(id) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/apps/${id}/users`, requestOptions).then(handleResponse);
}

function createAppUser(app_id, org_user_id, role) {
  const body = {
    app_id,
    org_user_id,
    role,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/app_users`, requestOptions).then(handleResponse);
}

function setVisibility(appId, visibility) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({ app: { is_public: visibility } }),
  };
  return fetch(`${API_URL}/apps/${appId}`, requestOptions).then(handleResponse);
}

function setMaintenance(appId, value) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({ app: { is_maintenance_on: value } }),
  };
  return fetch(`${API_URL}/apps/${appId}`, requestOptions).then(handleResponse);
}

function setSlug(appId, slug) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({ app: { slug: slug } }),
  };
  return fetch(`${API_URL}/apps/${appId}`, requestOptions).then(handleResponse);
}

function setPasswordFromToken({ token, password, organization, role, firstName, lastName, organizationToken }) {
  const body = {
    token,
    organizationToken,
    password,
    organization,
    role,
    first_name: firstName,
    last_name: lastName,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/set-password-from-token`, requestOptions).then(handleResponse);
}

function acceptInvite({ token, password }) {
  const body = {
    token,
    password,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/accept-invite`, requestOptions);
}
