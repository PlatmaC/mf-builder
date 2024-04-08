import { authHeader, handleResponse } from '@/_helpers';
import { API_URL } from '@/_helpers/http-client';

export const tooljetService = {
  fetchMetaData,
  skipVersion,
  skipOnboarding,
  finishOnboarding,
};

function fetchMetaData() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${API_URL}/metadata`, requestOptions).then(handleResponse);
}

function skipVersion() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
  };

  return fetch(`${API_URL}/metadata/skip_version`, requestOptions).then(handleResponse);
}

function skipOnboarding() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
  };

  return fetch(`${API_URL}/metadata/skip_onboarding`, requestOptions).then(handleResponse);
}

function finishOnboarding(options) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    credentials: 'include',
    body: JSON.stringify({
      ...options,
    }),
  };

  return fetch(`${API_URL}/metadata/finish_installation`, requestOptions).then(handleResponse);
}
