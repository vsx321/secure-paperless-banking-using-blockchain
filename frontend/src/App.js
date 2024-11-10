import logo from './logo.svg';
import './App.css';
import {Authenticate} from './components/Authenticate';
import { SignUpPage } from './components/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAccountDetails, createAccount, deposit, withdraw, transfer, getBalance } from './banking_web3';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authenticate />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
