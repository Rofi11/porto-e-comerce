import React, { Component} from 'react';
import { useSelector , useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom"
import "../assets/styles/ProductCard.css"
import { axiosInstance } from '../configs/API';
import { getCartData } from '../redux/actions/cartAct';


const ProductCard = (props) =>  {
    // manggil global state
    const {id} = useSelector(state => state.auth)
    // action global
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        //cek apakah sudah barang nya di cart atau belum
        axiosInstance.get("/carts/" , {
            params : {
                userId : id,
                productId : props.productData.id
            }
        })
        .then((result) => {
            if(result.data.length){
                axiosInstance.patch(`/carts/${result.data[0].id}` , {
                    quantity : result.data[0].quantity + 1
                })
                .then(() => {
                    alert("berhasiil menambahkan quantity")
                    dispatch(getCartData(id))
                })
                .catch(() => {
                    alert("gagal menambahkan quantity")
                })
            } else {
                axiosInstance.post("/carts/" , {
                    userId : id,
                    productId : parseInt(props.productData.id),
                    price : props.productData.price,
                    productName : props.productData.productName,
                    productImage : props.productData.productImage,
                    quantity : 1
                })
                .then((result) => {
                    alert("berhasil menambahkan barang")
                    dispatch(getCartData(id))
                })
                .catch((err) => {
                    alert(err)
                })
            }
        })
        .catch((err) => {
            alert(err)
        })
    }
    
    // utk navigasi
    const navigate = useNavigate()

    // event clik utk handle ketika id di terima
    const handleClick = (id) => {
        navigate(`/productDetail/${id}`)
    }
        return (
            <div className="card product-card">
                <img src={props.productData.productImage} onClick={() => {handleClick(props.productData.id)}} alt="baju"/>
                <div className='mt-2'>
                    <div >
                        {/* ketika di click akan ke triger dan mengirim id ke app, dan productDetail*/}
                        <h6 onClick={() => {handleClick(props.productData.id)}}>{props.productData.productName}</h6>
                        <span className='text-muted'>Rp.{props.productData.price}</span>
                    </div>
                    <div className='d-flex flex-row justify-end'>
                        <button className='btn btn-primary mt-2' onClick={addToCartHandler}>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }



export default ProductCard;