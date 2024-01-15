import { axiosInstance } from "../../configs/API";
import auth_types from "../reducers/types/authTypes";

//action object/ action creator utk cart.js
export function getCartData (userId){
    return async function(dispatch) {
        try {
            await axiosInstance.get("/carts/" , {
                params : {
                    userId 
                }
            })
            .then((result) => {
                dispatch({
                    type : auth_types.Cart,
                    payload : result.data
                })
            })
            .catch((err) => {
                alert(err)
            })
        } catch (error) {
        }
    }
}