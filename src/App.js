import './App.css';
import Nav from './components/Nav';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Lancamentos from './pages/Lancamentos';
import Lancados from './pages/Lancados';
import Home from './pages/Home';
import Profile from './pages/Profile'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/lancamentos" element={<Lancamentos />} />
          <Route exact path="/lancados" element={<Lancados />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
