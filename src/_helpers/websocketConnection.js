import config from 'config';
import { API_URL } from './http-client';

class WebSocketConnection {
  constructor(appId) {
    this.socket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${this.getWebsocketUrl()}`);

    this.addListeners(appId);
  }

  getWebsocketUrl() {
    const re = /https?:\/\//g;
    const isSecure = re.test(API_URL);

    let url;
    if (isSecure) {
      url = API_URL.replace(/(^\w+:|^)\/\//, '').replace('/api', '/ws');
    } else {
      url = `${window.location.host}${API_URL.replace(/(^\w+:|^)\/\//, '').replace('/api', '/ws')}`;
    }

    return url;
  }

  addListeners(appId) {
    // Connection opened
    this.socket.addEventListener('open', () => {
      console.info('connection established', event);

      //TODO: verify if the socket functionality is working or not
      this.socket.send(
        JSON.stringify({
          event: 'authenticate',
        })
      );

      this.socket.send(
        JSON.stringify({
          event: 'subscribe',
          data: appId,
        })
      );
    });

    // Connection closed
    this.socket.addEventListener('close', (event) => {
      console.info('connection closed', event);
    });

    // Listen for possible errors
    this.socket.addEventListener('error', (event) => {
      console.info('WebSocket error: ', event);
    });
  }
}

export const createWebsocketConnection = (appId) => {
  if (config.ENABLE_MULTIPLAYER_EDITING) {
    return new WebSocketConnection(appId);
  }
  return {
    socket: null,
  };
};
