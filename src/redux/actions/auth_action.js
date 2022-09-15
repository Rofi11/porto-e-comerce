
import auth_types from "../reducers/types/authTypes"
import { axiosInstance } from "../../configs/API"
// jsCookie biasanya dipakai di server side rendering, bisa juga utk client side
import jsCookie from "js-cookie"


//action global nya

export function login(values, setSubmitting) {
    return async function (dispatch) {
        try {
            alert(values.password)
            await axiosInstance.get("/users/" , {
                params: {
                    email : values.email,
                    password : values.password
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

                    jsCookie.set("user_data" , JSON.stringify(userData))
                } else {
                    alert("email/password")
                }
            })
            .catch((err) => {
                alert(err)
            })

            setSubmitting(false)
        } 
        catch(error){
            alert(error)
            setSubmitting(false)
        }
    }
}

// noted

// async => berjalan tidak berurutan 
// sync => berjalan berurutan 

// CSR = client side rendering 