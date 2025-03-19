let socket = null;
let listeners = [];
let isConnected = false;

export const connectSocket = (url, userId) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connected');
    isConnected = true;
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
    isConnected = false;
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    listeners.forEach((callback) => callback(data));
  };
};

export const addListener = (callback) => {
  listeners.push(callback);
};

export const removeListener = (callback) => {
  listeners = listeners.filter((cb) => cb !== callback);
};

export const sendMessage = (topic, message) => {
  if (socket && isConnected) {
    socket.send(JSON.stringify({ topic, message }));
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.close();
  }
};
