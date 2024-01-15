import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../configs/API';
import { getCartData } from '../redux/actions/cartAct';

function Cart () {

    const [isCheckoutMode , setIsCheckoutMode] = useState(false)
    const [recipientName , setrecipientName] = useState("")
    const [address , setaddress] = useState("")
    const [payment, setpayment] = useState(0)
    const [cartList, setCartList] = useState([])

    const {id} = useSelector(state => state.auth)

    const dispatch = useDispatch

    //manggil global state
    const renderCart = () => {
        axiosInstance.get("/carts/", {
            params : {
                userId : id
            }
        })
        .then((result) => {
            // console.log(result.data);
            setCartList(result.data)
        })
        .catch((err) => {
            alert(err)
        })

        return cartList.map((val) => {
            return (
                <tr>
                    <td className='align-middle'>
                        {val.productName}
                    </td>
                    <td className='align-middle'>
                        {val.price}
                    </td>
                    <td className='align-middle'>
                        <img src={val.productImage} alt="" style={{height : "125px"}}/>
                    </td>
                    <td className='align-middle'>
                        {val.quantity}
                    </td>
                    <td className='align-middle'>
                        {val.quantity * val.price}
                    </td>
                    <td className='align-middle'>
                        <button onClick={() => deleteCartHandler(val.id)} className='btn btn-danger'>
                            delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    useEffect(() => {
        renderCart()
    },[])

    const checkoutModeToggle = () => {
        setIsCheckoutMode(!isCheckoutMode)
    }

    const deleteCartHandler = (cartId) => {
        axiosInstance.delete(`/carts/${cartId}`)
        .then(() => {
            dispatch(getCartData(id))
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //handle subTotal Price
    const renderSubTotalPrice = () => {
        let subtotal = 0
        for(let i = 0; i < cartList.length; i++){
            subtotal += cartList[i].price * cartList[i].quantity
        }

        return subtotal
    }

    //handle tax fee
    const renderTaxFee = () => {
        return renderSubTotalPrice() * 0.05
    }

    //handle total price
    const renderTotalPrice = () => {
        return renderSubTotalPrice() + renderTaxFee()
    }

    //handler inputan
    const inputHandler = (e, field) => {
        const value = e.target.value

        if(field === "recipientName"){
            setrecipientName(value)
        } else if (field === "address"){
            setaddress(value)
        } else if (field === "payment"){
            setpayment(value)
        }
    }

    //utk handler button pay
    const payBtnHandler = () => {
        const d = new Date()
        //1. post ke transaksion db.json
        //2. delete semua cart item yang sudah di bayar

        //pengkondisian unag kurang, lebih atau pas
        if (payment < renderTotalPrice()){
            alert(`uang anda kurang ${renderTotalPrice() - payment}`)
            return // utk memberhentikan function, agar tidak menjalankan ke bawah
        }

        if(payment > renderTotalPrice()) {
            alert(`uang anda lebih ${payment - renderTotalPrice()}`)
        } else if (payment === renderTotalPrice()) {
            alert("terimakasih atas transaksi nya")
        }

        axiosInstance.post("/transactions/" , {
            userId : id,
            address : address,
            recipientName : recipientName,
            totalPrice : parseInt(renderTotalPrice()),
            totalPayment : parseInt(payment),
            transactionDate :  `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}` , //DD-MM-YYYY
            transactionItem : cartList
        })
        .then((result) => {
            alert("Berhasil Melakukan Pembayran")
            //utk mendelete yg sudah di transaction kan ==> setaip yg punya id didalam transaction akan di hapus, oleh function deleteCartHandler yg berada di atas
            result.data.transactionItem.forEach((val) => {
                deleteCartHandler(val.id)
            })
        })
        .catch((err) => {
            alert(err)
        })

    }
    return (
        <div className='p-5 text-center'>
                <h1>Cart</h1>
                    <div className="row mt-4">
                        <div className="col-9">
                            <table className='table'>
                                <thead className='thead-light'>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* diisi render */}
                                    {renderCart()}
                                </tbody>
                                <tfoot className='bg-light'>
                                    <tr>
                                        <td colSpan="6">
                                            <button onClick={checkoutModeToggle} className='btn btn-success'>
                                                Checkout
                                            </button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        {/* pakai if ternary ==> utk membuat kalo mau checkout ,baru keluar si total summary nya */}

                        {
                            isCheckoutMode ? 
                                <div className="col-3">
                                    {/* form-checkout */}
                                    <div className="card">
                                        <div className="card-header text-start">
                                            <strong>Order Summary</strong>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex my-2 flex-row justify-content-between">
                                                <span className='fw-bold'>SubTotal Price</span>
                                                <span>Rp {renderSubTotalPrice()}</span>
                                            </div>
                                            <div className="d-flex my-2 flex-row justify-content-between">
                                                <span className='fw-bold'>Tax Fee (5%)</span>
                                                <span>Rp {renderTaxFee()}</span>
                                            </div>
                                            <div className="d-flex my-2 flex-row justify-content-between">
                                                <span className='fw-bold'>Total Price</span>
                                                <span>Rp {renderTotalPrice()}</span>
                                            </div>
                                        </div>
                                        <div className="card-body text-start border-top">
                                            <label htmlFor="recipientName">Recipient Name</label>
                                            <input type="text" className='form-control mb-3' name='recipientName' 
                                            onChange={(e) => inputHandler(e, "recipientName")} />
                                            <label htmlFor="address">Address</label>
                                            <input type="text" className='form-control' name='address' 
                                            onChange={(e) => inputHandler(e, "address")}/>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <input type="number" className='form-control mx-1' name="payment" 
                                                onChange={(e) => inputHandler(e, "payment")}/>
                                                <button  className='btn btn-success mx-1' onClick={payBtnHandler}>Pay</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            : null
                        } 
                    </div>
            </div>
    )
}

export default Cart