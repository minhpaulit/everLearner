import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ConnectionConfig from './components/Features/ConnectionConfig';
import HabitEdit from './components/Features/HabitEdit';
import Habit from './components/Features/Habit';
import { ConnectionProvider } from './context/ConnectionContext';

function App() {
  return (
    <ConnectionProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connections/config" element={<ConnectionConfig />} />
            <Route path="/connections/config/:id" element={<ConnectionConfig />} />
            <Route path="/habit" element={<Habit />} />
            <Route path="/habit/edit/:id" element={<HabitEdit />} />
          </Routes>
        </div>
      </Router>
    </ConnectionProvider>
  );
}

export default App;
