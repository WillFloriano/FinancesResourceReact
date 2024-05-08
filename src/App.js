import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { useAuthentication } from './hooks/userAuthentication';

import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Lancados from './pages/Lancados/Lancados';
import Lancamentos from './pages/Lancamentos/Lancamentos';
import EditLancamentos from './pages/EditLancados/EditLancamentos';


function App() {

const [user, setUser] = useState(undefined)
const {auth} = useAuthentication();

const loadingUSer = user === undefined

useEffect(()=>{

  onAuthStateChanged(auth, (user)=> {
    setUser(user)
  })
}, [auth]);


if(loadingUSer) {
  return <p>Carregando...</p>;
}

  return (
    <div className="App">
      <AuthProvider value={{user}}>
      <Router>        
      <div className="container">
      <Navbar/>
        <Routes>
            <Route path="/" element={user ? <Home/> : <Login/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/" />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/lancados" element={user ? <Lancados/> : <Navigate to="/login" />} />
            <Route path="/lancados/edit/:id" element={user ? <EditLancamentos/> : <Navigate to="/login" />} />
            <Route path="/lancados/mes/:id" element={user ? <Lancados/> : <Navigate to="/login" />} />
            <Route path="/lancamentos" element={user ? <Lancamentos/> : <Navigate to="/login" />} />
        </Routes>
      </div>     
      </Router>
      </AuthProvider>
      <Footer/>
    </div>
  );
}

export default App;
