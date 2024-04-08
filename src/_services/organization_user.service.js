import { authHeader, handleResponse } from '@/_helpers';
import { API_URL } from '@/_helpers/http-client';

export const organizationUserService = {
  archive,
  unarchive,
  create,
  changeRole,
  inviteBulkUsers,
};

function create(first_name, last_name, email) {
  const body = {
    first_name,
    last_name,
    email,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/organization_users`, requestOptions).then(handleResponse);
}

function inviteBulkUsers(formData) {
  const requestOptions = { method: 'POST', headers: authHeader(true), body: formData, credentials: 'include' };
  return fetch(`${API_URL}/organization_users/upload_csv`, requestOptions).then(handleResponse);
}

// Deprecated
function changeRole(id, role) {
  const body = {
    role,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/organization_users/${id}/change_role`, requestOptions).then(handleResponse);
}

function archive(id) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/organization_users/${id}/archive`, requestOptions).then(handleResponse);
}

function unarchive(id) {
  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/organization_users/${id}/unarchive`, requestOptions).then(handleResponse);
}
