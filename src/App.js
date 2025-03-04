import Router from '@router/Router';
import { ERROR_MESSAGES } from '@constants/errorMessages';

function App() {
  if (!window.errMsgs) window.errMsgs = ERROR_MESSAGES;

  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
