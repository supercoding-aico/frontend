import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Router from '@router/Router';
import { __connectWebSocket } from '@redux/slice/websocketSlice';

function App() {
  const dispatch = useDispatch();

  const wsUrl = process.env.REACT_APP_WS_URL;

  useEffect(() => {
    dispatch(__connectWebSocket('topic/notification/66'));
  }, [wsUrl]);

  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
