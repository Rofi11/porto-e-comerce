import logo from './logo.svg';import './App.css';
import ProductCard from './componets/ProductCard';
import Home from './pages/Home';
import "bootstrap/dist/css/bootstrap.css"
import {Route, Routes} from "react-router-dom"
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jsCookie from "js-cookie"
import auth_types from './redux/reducers/types/authTypes';
import Admin from './pages/Admin/Admin';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { getCartData } from './redux/actions/cartAct';
import { userKeepLogin } from './redux/actions/auth_action';

function App() {
  const dispatch = useDispatch()

  // component did mount
  useEffect(() => {
    // const userLocalStorage = localStorage.getItem("userDataEmmerce")
      const userData = jsCookie.get("user_data") // dpt dari action global login, masih berbentuk string
      if(userData) {
        dispatch({
          type : auth_types.Login,
          payload :JSON.parse(userData) // diubah kembali menjadi object
        })
        // console.log(userData);

      }
  }, [])

  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/editProfile' element={<EditProfile/>}/>
        <Route path='/productDetail/:id' element={<ProductDetail/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
  );
}

export default App;
