import { authHeader, handleResponse } from '@/_helpers';
import { API_URL } from '@/_helpers/http-client';

export const userService = {
  getAll,
  createUser,
  deleteUser,
  updateCurrentUser,
  changePassword,
  getAvatar,
  updateAvatar,
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
}

function getAvatar(id) {
  const requestOptions = { method: 'GET', headers: authHeader(), credentials: 'include' };
  return fetch(`${API_URL}/files/${id}`, requestOptions)
    .then((response) => response.blob())
    .then((blob) => blob);
}

function updateAvatar(formData) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(true),
    body: formData,
    credentials: 'include',
  };
  return fetch(`${API_URL}/users/avatar`, requestOptions).then(handleResponse);
}

function createUser(first_name, last_name, email, role) {
  const body = {
    first_name,
    last_name,
    email,
    role,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
  const requestOptions = { method: 'DELETE', headers: authHeader(), credentials: 'include', body: JSON.stringify({}) };
  return fetch(`${API_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function updateCurrentUser(firstName, lastName) {
  const body = { first_name: firstName, last_name: lastName };
  const requestOptions = { method: 'PATCH', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/users/update`, requestOptions).then(handleResponse);
}

function changePassword(currentPassword, newPassword) {
  const body = { currentPassword, newPassword };
  const requestOptions = { method: 'PATCH', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/users/change_password`, requestOptions).then(handleResponse);
}
