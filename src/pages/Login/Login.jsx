import "./Login.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux' 
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance} from "../../configs/API";
import auth_types from "../../redux/reducers/types/authTypes";
//formik
import { useFormik } from "formik";
import * as Yup from "yup"
import YupPassword from "yup-password"
//js cookie
import jsCookie from "js-cookie"
import { login, logOut } from "../../redux/actions/auth_action";
import { Icon } from 'react-icons-kit'
import {view_off} from 'react-icons-kit/ikons/view_off'
import {view} from 'react-icons-kit/ikons/view'

function Login () {
    // configure yup
    YupPassword(Yup) // extend yup

    const [inputEmail, setUsername] = useState("")
    const [inputPassword , setPassword] = useState("")
    const [type, setType] = useState("password")
    const [icon, setIcon] = useState (view_off)
    let nav = useNavigate()

    const handleToggle = () => {
        if(type === "password"){
            setIcon(view)
            setType("text")
        } else {
            setIcon(view_off)
            setType("password")
        }
    }

    const authSelector = useSelector((state) => state.auth) // ambil global state

    const dispatch = useDispatch()

    // function inputHandler(event, field) {
    //     const {value} = event.target

    //     if(field === "email") {
    //         setUsername(value)
    //     } else if(field === "password"){
    //         setPassword(value)
    //     }
    // }

    // FORMIK
    //initiallition
    const formik = useFormik ({
        initialValues : {
            user_email : "",
            password : "",
        },
        validationSchema: Yup.object().shape({
            user_email: Yup.string().required("harap isi email"),
            password : Yup.string().required("harap isi password"),
            // noted utk nanti register ==> dari Yup-password
            //  .minLowercase(1, 'password must contain at least 1 lower case letter')
            // .minUppercase(1, 'password must contain at least 1 upper case letter')
            // .minNumbers(1, 'password must contain at least 1 number')
            // .minSymbols(1, 'password must contain at least 1 special character')
        }) ,
        validateOnChange : false, // ini utk onChange, menvalidasi setiap ada perubahan di onchange
        onSubmit:(values) => {
            // alert(values.email)
            // alert(values.password)

            // melakukan action global
            dispatch(login(values, formik.setSubmitting))
            nav("/home")
        }
    })

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
                            {/* simpen formik kalo salah */}
                                {formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}
                            <label htmlFor="email">email or username</label>
                            <input
                            name="email" 
                            // onChange={(e) => inputHandler(e, "email")} 
                            //formik validation
                            onChange={(event) => formik.setFieldValue("user_email", event.target.value)}
                            type="text"  
                            />
                        </div>
                        <div className="form-password d-flex flex-column">
                                {formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
                            <label htmlFor="password">Password</label>
                            <div className="border border-dark">
                                <input name="password"
                                className="input"
                                // onChange={(e) => inputHandler(e, "password")} 
                                //formik validation
                                onChange={(event) => formik.setFieldValue("password", event.target.value)}
                                type={type}
                                />
                                <span onClick={handleToggle}><Icon icon={icon} size={25}/></span>

                            </div>
                        </div>

                        <input 
                        type="button" 
                        value="Sign in" 
                        // onClick={LoginHandler} 
                        onClick={formik.handleSubmit}
                        />

                        <div className="form-last d-flex flex-row justify-content-between">
                            <a href="#">Forgot Password?</a>
                            <Link to="/register">Sign Up</Link>
                        </div>

                        {/* muncull button log-out kalo sudah login */}
                        {/* {
                            authSelector?.email ?
                        <div className="d-grid mt-3">
                            <button type="submit" className="btn btn-primary" 
                            // onClick={LoginHandler}
                            onClick={logOut}
                            
                            >
                            Logout
                            </button>
                        </div>
                        : null
                        } */}
                    </div>
                </div>
            </div>
    )
}

export default Login