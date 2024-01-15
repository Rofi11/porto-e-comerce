import auth_types from "../reducers/types/authTypes"
import { axiosInstance } from "../../configs/API"
// jsCookie biasanya dipakai di server side rendering, bisa juga utk client side
import jsCookie from "js-cookie"


//action global nya

export function login(values, setSubmitting) {
    return async function (dispatch) {
        try {
            // alert(values.password)
            await axiosInstance.get("/users/" , {
                params: {
                    user_email : values.user_email,
                    password : values.password,
                }
            })
            .then((result) => {
                const userData = result.data[0]
                console.log(userData);

                if(userData !== undefined){
                    alert("berhasil login")
                    dispatch({
                        type : auth_types.Login,
                        payload : userData
                    })
                    // alert("cookie")
                    jsCookie.set("user_data" , JSON.stringify(userData)) // kirim ke app, agar bisa di buat terus login , versi pakai cokkie
                    // alert("cokkie2")
                } else {
                    alert("email/password")
                }
            })
            .catch((err) => {
                alert(err)
            })

        } 
        catch(error){
            alert(error)
            setSubmitting(false)
        }
    }
}


// utk register
export function register(values, setSubmitting){
    return async function(dispatch) {
        try {
            alert(values)
            if (values.password === values.password2){
                await axiosInstance.post("/users/register" , {
                    fullname : values.fullname,
                    username : values.username,
                    password : values.password,
                    email :values.email,
                    role : "users",
                    fotoProfile: values.fotoProfile
                })
                .then((result) => {
                    console.log(result.data);
                    delete result.data.password
    
                    dispatch({
                        type: auth_types.Register,
                        payload : result.data
                    })
                })
                .catch((err) => {
                    alert(err)
                })
            } else {
                //handling ketika re-type pass tidak sama
                alert("password tidak singkron")
            }

            setSubmitting(false)
        } catch (error){
            alert(error)
            setSubmitting(false)
        }
    }
}


// noted

// async => berjalan tidak berurutan 
// sync => berjalan berurutan 

// CSR = client side rendering 