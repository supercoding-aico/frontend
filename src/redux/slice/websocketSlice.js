import { createSlice } from '@reduxjs/toolkit';
import { Client } from '@stomp/stompjs';

const initialState = {
  message: null,
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
      state.notificationCount = 0;
    },
  },
});

export const __connectWebSocket = (topic) => (dispatch) => {
  let isConnected = false;

  try {
    if (isConnected) return;

    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket Connected');

        isConnected = true;

        client.subscribe(topic, (message) => {
          return dispatch(addMessage(JSON.parse(message.body)));
        });
      },
      onDisconnect: () => {
        isConnected = false;

        console.log('⏸️ WebSocket disconnected');
        setTimeout(() => client.activate(), 5000);
      },
      onWebSocketError: (error) => {
        isConnected = false;

        console.error('⚠️ WebSocket error:', error);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  } catch (error) {
    console.error('⚠️ WebSocket connection failed', error);
  }
};

export const { addMessage, countNotification, clearMessage } = websocketSlice.actions;
export default websocketSlice.reducer;
