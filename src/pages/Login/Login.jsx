import "./Login.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {connect, useDispatch, useSelector} from 'react-redux' 
import {loginUser} from '../../redux/actions/userAct'
import { useState } from "react";
import { useEffect } from "react";
import  Axios  from "axios";
import { API_URL } from "../../constants/API";

function Login () {

    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    let nav = useNavigate()

    // const {id} = useSelector(state => state.userReducer)

    // const dispatch = useDispatch()

    function inputHandler(event, field) {
        const {value} = event.target

        if(field === "username") {
            setUsername(value)
        } else if(field === "password"){
            setPassword(value)
        }
    }

    function LoginHandler() {
        Axios.get(`${API_URL}/users`, {
            params :{
                username : username,
                password : password,
                // email : username
            }
        })
        .then((result) => {
            console.log(result.data[0]);
            if(result.data[0]){
                alert("Berhasil login")
                nav("/home")
                nav(0) // agar ada refresh ya gitu / force redirect
            } else {
                alert("username/ password salah")
            }
        })
        .catch((err) => {
            alert(err)
        })
    }


    return (
        <div className="container-utama d-flex">
                {/* bagian gambar */}
                <div className="section-gambar d-flex flex-column">
                    <div className="allice">
                        <div className="name-allice">Allice</div>
                        <div className="enjoy">Allice Help you Connect and Share with the People in your life</div>
                    </div>            
                </div>

                {/* bagian-form-login  */}
                <div className="section-login d-flex justify-content-center">
                    {/* form */}
                    <div className="form-login d-flex flex-column">
                        <div className="name">Sign in to Allice</div>
                        <div className="form-username d-flex flex-column">
                            {/* ternary option utk ketika salah pass / salah username
                            {
                                this.props.userGlobal.errMsg ? 
                                <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div> : null
                            } */}
                            <label htmlFor="username">Username</label>
                            <input name="username" onChange={(e) => inputHandler(e, "username")} type="text" id="username" placeholder="Username or Email Address" />
                        </div>
                            <div className="form-password d-flex flex-column">
                            <label htmlFor="password">Password</label>
                            <input name="password" onChange={(e) => inputHandler(e, "password")} type="password" id="password" placeholder="Password"/>
                        </div>

                        <input type="button" value="Sign in" onClick={LoginHandler} />

                        <div className="form-last d-flex flex-row justify-content-between">
                            <a href="#">Forgot Password?</a>
                            <Link to="/SignUp">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Login