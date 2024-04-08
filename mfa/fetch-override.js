import config from 'config';

if (config.authImplicit) {
  var originalFetch = window.fetch;
  window.fetch = function (input, init) {
    const token = localStorage.getItem('token');
    if (token) {
      if (!init) {
        init = {};
      }
      if (!init.headers) {
        init.headers = new Headers();
      }
      if (init.headers instanceof Headers) {
        init.headers.append('Authorization', 'Bearer ' + token);
      } else if (init.headers instanceof Array) {
        init.headers.push(['Authorization', 'Bearer ' + token]);
      } else {
        init.headers['Authorization'] = 'Bearer ' + token;
      }
    }

    return originalFetch(input, init);
  };
}
