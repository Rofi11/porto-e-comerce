import logo from './logo.svg';import './App.css';
import ProductCard from './componets/ProductCard';
import Home from './pages/Home';
import "bootstrap/dist/css/bootstrap.css"
import {Route, Routes} from "react-router-dom"
import Login from "./pages/Login/Login"
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userDataEmmerce")

    
      const userData = JSON.parse(userLocalStorage) // yg string di ubah kembali menjadi object
      // this.props.userKeepLogin(userData)
      // this.props.getCartData(userData.id) // cart nya bakal ada kalo udh login, ngikutin dari login
    
  }, [])
  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
  );
}

export default App;
