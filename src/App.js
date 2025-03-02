import Router from '@router/Router';
import { ERROR_MESSAGES as errorMessages } from '@constants/errorMessages';

function App() {
  if (!window.errorMessages) window.errorMessages = errorMessages;

  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
