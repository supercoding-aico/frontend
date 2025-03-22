import { createSlice } from '@reduxjs/toolkit';
import { Client } from '@stomp/stompjs';

const initialState = {
  messages: [],
  subscribedTopics: [],
};

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    subscribeToTopic: (state, action) => {
      if (!state.subscribedTopics.includes(action.payload)) {
        state.subscribedTopics.push(action.payload);
      }
    },
    unsubscribeFromTopic: (state, action) => {
      state.subscribedTopics = state.subscribedTopics.filter((topic) => topic !== action.payload);
    },
  },
});

export const __connectWebSocket = (topic) => (dispatch) => {
  try {
    const client = new Client({
      brokerURL: process.env.REACT_APP_WS_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket connected');
        dispatch(subscribeToTopic(topic));
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
        setTimeout(() => client.activate(), 5000);
      },
      onWebSocketError: (err) => {
        console.error('WebSocket error:', err);
      },
    });

    client.activate();

    client.onStompMessage = (message) => {
      const messageData = JSON.parse(message.body);
      dispatch(addMessage(messageData));
    };

    return () => {
      client.deactivate();
    };
  } catch (error) {
    console.error('WebSocket connection failed', error);
  }
};

export const { addMessage, subscribeToTopic, unsubscribeFromTopic } = websocketSlice.actions;
export default websocketSlice.reducer;
