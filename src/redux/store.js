import {combineReducers} from "redux"
// configure store utk ganti create store
import { configureStore } from "@reduxjs/toolkit"
// redux-thunk utk middleware nya
import thunk from "redux-thunk"
import authReducer from "./reducers/Auth"
import cartReducer from "./reducers/Cart"

//buat combine reducer nya
const rootReducer = combineReducers({
    auth : authReducer,
    cart : cartReducer
})

// membuat store nya di sini buka lagi di index.js src nanti tinggal export saja ke index.js, jadi akan bisa punya sifat inheritance
const store = configureStore({
    reducer : rootReducer, 
    middleware: [thunk]
})

export default store

//noted 
// useDispatch()

// reducer (global state)
// action (set state globally)
// useDispatch (memanggil action )

// middleware ( action tambahan )

// usedispatch => action => merubah state di reducers

// usedispatch => middleware => action => merubah state di reducers 