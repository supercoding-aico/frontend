import Router from '@router/Router';
import { errorMessages } from '@constants/errorMessages';

function App() {
  if (!window.errorMessages) window.errorMessages = errorMessages;

  return (
    <div className='App'>
      <Router />
    </div>
  );
}

export default App;
