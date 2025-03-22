import { createSlice } from '@reduxjs/toolkit';

const socket = new WebSocket(process.env.REACT_APP_WS_URL);

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

export const __connectWebSocket = () => (dispatch) => {
  try {
    socket.onopen = () => {
      console.log('WebSocket connected');
      dispatch(connectWebSocket());
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      dispatch(addMessage(messageData));

      if (messageData.topic && !messageData.subscribed) {
        dispatch(subscribeToTopic(messageData.topic));
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setTimeout(() => dispatch(__connectWebSocket()), 5000);
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return socket;
  } catch (error) {
    console.error('WebSocket connection failed', error);
  }
};

export const __subscribeToTopicAction = (topic) => (dispatch) => {
  socket.send(JSON.stringify({ action: 'subscribe', topic }));
  dispatch(subscribeToTopic(topic));
};

export const __unsubscribeFromTopicAction = (topic) => (dispatch) => {
  socket.send(JSON.stringify({ action: 'unsubscribe', topic }));
  dispatch(unsubscribeFromTopic(topic));
};

export const {
  connectWebSocket,
  disconnectWebSocket,
  addMessage,
  subscribeToTopic,
  unsubscribeFromTopic,
} = websocketSlice.actions;
export default websocketSlice.reducer;
