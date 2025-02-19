import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Habit from './components/Features/Habit';
import HabitEdit from './components/Features/HabitEdit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/habits" element={<Habit />} />
          <Route path="/habits/edit/:id" element={<HabitEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
