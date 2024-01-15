import "./Register.css"
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import {Link, Navigate, useNavigate} from 'react-router-dom'
import auth_types from "../../redux/reducers/types/authTypes";
import { axiosInstance } from "../../configs/API";
//formik
import { useFormik } from "formik";
import * as Yup from "yup"
import YupPassword from "yup-password";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/auth_action";


function Register () {
    // configure yup
    YupPassword(Yup)

    const {id} = useSelector((state) => state.auth)

    let nav = useNavigate()

    let dispatch = useDispatch()

    //formik initialliation
    const formik = useFormik({
        initialValues : {
            email : "",
            fullname : "",
            username : "",
            password : "",
            password2 : ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("harap masukan email").email("format yang dimasukan bukan email"),
            password: Yup.string().required("harap isi password").min(8).minUppercase(1).minNumbers(1).minSymbols(1),
            password2: Yup.string().required("harap isi password").min(8).minUppercase(1).minNumbers(1).minSymbols(1)

        }),
        validateOnChange : false,
        onSubmit: (values) => {
            // alert(values.email)
            // alert(values.fullname)
            // alert(values.username)
            // alert(values.password)
            // alert(values.password2)
            // diisi oleh dispatch jika menggunakan global state
            dispatch(register(values, formik.setSubmitting))
        }
    })

    // ukt membuat id, saat suda berinteraksi dengan back-end (akan dimatikan dulu, sampai nanti berinteraksi dengan backend), berhubung kita pakai global state harunya di simpan di global saja, anggap ini contoh
    
    // async function Register(values) {
    //     let lastId = 1

    //     await axiosInstance("/user/")
    //     .then((res) => {
    //         console.log(res.data.length);

    //         //pengkondisian membaut id nya
    //         if(res.data?.length > 0) {
    //             lastId = res.data.length + 1
    //         }
    //     })
    // }

    if (id) {
        nav("/")
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
                    <div className="form-signUp d-flex flex-column">
                        <div className="name">Sign Up to Allice</div>
                        <div className="form-username d-flex flex-column">
                            <label htmlFor="name">Full name</label>
                            <input 
                            name="fullName" 
                            type="text" 
                            id="name" 
                            placeholder="fullName" 
                            onChange={(event) => formik.setFieldValue("fullname", event.target.value)}
                            />
                            <label htmlFor="username">Username</label>
                            <input 
                            name="username" 
                            type="text" 
                            id="username" 
                            placeholder="Username"
                            onChange={(event) => formik.setFieldValue("username", event.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                                {formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}
                            <input 
                            name="email"  
                            type="Email" 
                            id="Email" 
                            placeholder="Email Address" 
                            onChange={(event) => formik.setFieldValue("email", event.target.value)}
                            />
                        </div>
                            <div className="form-password d-flex flex-column">
                                <label htmlFor="password">Password</label>
                                {formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
                                <input 
                                name="password"  
                                type="password" 
                                id="password" 
                                placeholder="Password"
                                onChange={(event) => formik.setFieldValue("password", event.target.value)}
                                />
                                <label htmlFor="re-password">Re-Password</label>
                                {formik.errors.password2 ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
                                <input 
                                name="password2"  
                                type="password" 
                                id="re-password" 
                                placeholder="Password"
                                onChange={(event) => formik.setFieldValue("password2", event.target.value)}
                                />
                            </div>
                                    
                        <div className="checkBox d-flex flex-row ">
                            <input type="checkbox" name="confirm" id="confirm" />
                            <label htmlFor="confirm">Creating an account means you’re okay with our <a href="#">Terms of Service, Privacy Policy</a>, and our default <a href="#">Notification Settings.</a> </label>
                        </div>
                        <input type="button" value="Create Account" onClick={formik.handleSubmit}/>
                    </div>
                </div>
                <p className="back-login">Already Member? <Link to="/">Sign in</Link></p>
            </div>
        )
    }

export default Register
