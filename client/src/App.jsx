import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';

function App() {

  const [ sessionToken, setSessionToken ] = useState('');

  // console.log("App.jsx: ", sessionToken)

  const updateToken = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken); 
  }
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route 
        path='/'
        element={<Auth updateToken={updateToken} />}
        />
        <Route 
        path='/room'
        element={<h2>Rooms</h2>}/>
        </Routes>
    </div>
  );
}

export default App;
