//global state utk atuhentication login and logout
import auth_types from "./types/authTypes";

const init_state = {
    email : "",
    password : "",
    fullname: "",
    username: "",
    password : "",
    password : "",
    bio : "",
    fotoProfile : "",
    role : ""
}

function authReducer(state = init_state, action){
    if (action.type === auth_types.Login){
        return {
            ...state,
            ...action.payload,
            email : action.payload.email, // ini karena yg di kirim object dari auth_types
            password : action.payload.password
        }
    } else if (action.type === auth_types.Logout) {
        return init_state
    } else if (action.type === auth_types.Register){
        return {
            ...state,
            ...action.payload
        }
    }
    // nilai default
    return state
}


export default authReducer

// noted

// globalstate
// variable yang bisa render secara otomatis => (values )

// reducers => init global state
// middlware => menginterupsi ( function mengolah sebuah data ) 
// action => set state terhadap global state ( tergantung kondisi typenya )
// store => kumpulan reducers (library reducers)