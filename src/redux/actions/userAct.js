import Axios from "axios"
import { API_URL } from "../../constants/API"

// function login
export const loginUser = (username , password) => {
    // karena kita mau meminta data dari Api maka kita pakai redux thunk, makanya ada return
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {// merupakan sebuah fitur yg berguna meminta data spesifik ke json-server
                username: username,
            }
        })
        .then((result) => {
            // console.log(result.data); // hasil nya bentuk array
            if(result.data.length) {
                if(password === result.data[0].password){
                    // delete pass dulu, agar tidak tersimpan di local storage maupun ke global state
                    delete result.data[0].password
                    //menyimpan ke local storage
                    localStorage.setItem("userDataEmmerce" , JSON.stringify(result.data[0]))
                    dispatch({
                        type: "USER_LOGIN",
                        payload : result.data[0] // utk dpt object nya, berada di index ke 0
                    })
                } else {
                    //handle wrong password
                    dispatch({
                        type: "USER_ERROR",
                        payload : "Wrong Password"
                    })
                }
            } else {   
                //handle error username not found
                dispatch({
                    type: "USER_ERROR",
                    payload : "User Not Found"
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}