import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {SignIn}  from './signin';
import { SignUp } from './signup';
import { User } from './user';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/user" element={<User/>} />
      </Routes>
    </Router>
  );
}

export default App;
