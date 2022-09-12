import React, { Component} from 'react';
import {useNavigate} from "react-router-dom"
import "../assets/styles/ProductCard.css"


const ProductCard = (props) =>  {
    // utk navigasi
    const navigate = useNavigate()

    // event clik utk handle ketika id di terima

    const handleClick = (id) => {
        navigate(`/productDetail/${id}`)
    }
        return (
            <div className="card product-card">
                <img src={props.productData.productImage} alt="baju"/>
                <div className='mt-2'>
                    <div >
                        {/* ketika di click akan ke triger dan mengirim id ke app, dan productDetail*/}
                        <h6 onClick={() => {handleClick(props.productData.id)}}>{props.productData.productName}</h6>
                        <span className='text-muted'>Rp.{props.productData.price}</span>
                    </div>
                    <div className='d-flex flex-row justify-end'>
                        <button className='btn btn-primary mt-2'>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }



export default ProductCard;