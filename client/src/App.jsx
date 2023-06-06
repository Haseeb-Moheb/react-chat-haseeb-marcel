import './App.css';
import Auth from './components/auth/Auth';
import { useState } from 'react';

function App() {

  const [ sessionToken, setSessionToken ] = useState('Sample Token');

  // console.log("app.jsx: ", sessionToken)
  const updateToken = newToken => {
    localStorage.setItem("token", newToken)
    sessionToken(newToken);
  }

  return (
    <div className="App">
      
      <Auth updateToken={updateToken} />
      
    </div>

  );
}

export default App;
