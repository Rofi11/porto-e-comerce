import React, { Component, useEffect, useState } from 'react';
import Axios from "axios"
import {useParams} from "react-router-dom"
//redux
import {useSelector, useDispatch} from 'react-redux' // functionalitas nya sama kaya mapStateToProps
//action
// import {getCartData} from '../redux/actions/cartAct'
import { axiosInstance } from '../configs/API';
import { getCartData } from '../redux/actions/cartAct';

const ProductDetail = () => {
    const userId = useSelector(state => state.auth.id)
    const dispatch = useDispatch()
    
    // hook data kiriman id dari productCard
    const {id} = useParams()

    // kaya state nya (kalo di reactHooks)
    const [productData, setProductData] = useState({})
    const [productNotFound, setProductNotFound] = useState(false) //ktk barang tidak ada
    const [quantity, setQuantity] = useState(1) // jumalh quantity barang nya

    // kaya componentDidUpdate, fetch product
    useEffect(() => {
        axiosInstance.get(`/products/${id}`)
        .then((result) => {
            setProductData(result.data)
        })
        .catch((err) => {
            alert(err)
            setProductNotFound(true)
        })
    }, [id])

    // tombol button tambah kurang nya
    const qtyBtnHandler = (action) => {
        if (action === "increment") {
            setQuantity(quantity + 1)
        } else if (action === "decrement" && quantity > 1){
            setQuantity(quantity - 1)
        }
    }

    const addToCartHandler = () => {
        //cek apakah sudah barang nya di cart atau belum
        axiosInstance.get("/carts/" , {
            params : {
                userId : userId, // ambil dari global state user
                productId : productData.id
            }
        })
        .then((result) => {
            if(result.data.length){
                axiosInstance.patch(`/carts/${result.data[0].id}` , {
                    quantity : result.data[0].quantity + quantity
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
                    userId : userId, // ambil dari global state user
                    productId : parseInt(productData.id),
                    price : productData.price,
                    productName : productData.productName,
                    productImage : productData.productImage,
                    quantity : quantity
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

        return (
        <div>
            <div className="container">
                {/* ternary option,kalo ada barang atau tidak barang nya */}
                    {
                        productNotFound === true ?
                        <div className='alert alert-warning mt-3'> Product with ID {id} not found </div> 
                        :
                    <div className="row mt-3">
                        <div className="col-6">
                            <img 
                                style={{width: "100%"}}
                                src= {productData.productImage}
                                alt="" />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center">
                            <h4>{productData.productName}</h4>
                            <h5>Rp{productData.price}</h5>
                            <p>
                                {productData.description}
                            </p>
                            <div className='d-flex flex-row align-items-center'>
                                <button onClick={() => {qtyBtnHandler("decrement")}} className='btn btn-primary me-4'>
                                    -
                                </button>
                                {quantity}
                                <button onClick={() => {qtyBtnHandler("increment")}} className='btn btn-primary mx-4'>
                                    +
                                </button>
                            </div>
                            <button className='btn btn-success mt-3' onClick={addToCartHandler}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
            }
            </div>
                {/* <pre>
                    {JSON.stringify(product, null, 2)}
                </pre> */}
            </div>
        )
    }
    

export default ProductDetail