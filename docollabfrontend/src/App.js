import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {SignIn}  from './signin';
import { SignUp } from './signup';
import { User } from './user';
import { Home } from './home'
import { ForGotPassword } from './forgotpassword';
import { SetPassword } from './SetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/forgotpassword" element={<ForGotPassword/>} />
        <Route path="/setpassword" element={<SetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
