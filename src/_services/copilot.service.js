import { authHeader, handleResponse } from '@/_helpers';
import { API_URL } from '@/_helpers/http-client';

export const copilotService = {
  getCopilotRecommendations,
  validateCopilotAPIKey,
};

async function getCopilotRecommendations(options) {
  const body = {
    query: options.query,
    context: options.context,
    language: options.lang,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };

  const { data } = await fetch(`${API_URL}/copilot`, requestOptions).then(handleResponse);

  return data || {};
}

function validateCopilotAPIKey(key, organizationId) {
  const body = {
    secretKey: key,
    organizationId,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), credentials: 'include', body: JSON.stringify(body) };
  return fetch(`${API_URL}/copilot/api-key`, requestOptions).then(handleResponse);
}
