import auth_types from "./types/authTypes"
//global state utk cart
const init_state = {
    cartList : []
}

function cartReducer(state = init_state, action){
    if(action.type === auth_types.Cart){
        return {
            ...state,
            cartList : action.payload
        }
    }
    //nilai default
    return state
}

export default cartReducer