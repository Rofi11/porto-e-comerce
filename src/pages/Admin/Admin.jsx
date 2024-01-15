import { axiosInstance } from '../../configs/API';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import "./Admin.css"

function Admin () {
    //state
    const [ProductList , setProductList] = useState([])
        //utk edit
    const [editId , setEditId] = useState(0)
    const [editProductName , setEditProductName] = useState("")
    const [editPrice, setEditPrice] = useState(0)
    const [editProductImage , setEditProductImage] = useState("")
    const [editDescription , setEditDescription] = useState("")
    const [editCategory , setEditCategory] = useState("")
        // utk add Product
    const [addProductName, setAddProductName] = useState("")
    const [addPrice, setAddPrice] = useState("")
    const [addProductImage, setAddProductImage] = useState("")
    const [addDescription, setAddDescription] = useState("")
    const [addCategory, setAddCategory] = useState("")

    // fetch Product
    const fetchProduct = () => {
        axiosInstance.get("/products/")
        .then((result) => {
            // console.log(result.data);
            setProductList(result.data)
        })
        .catch((err) => {
            alert(err)
        })
    }

    //component did mount
    useEffect(() => {
        fetchProduct()
    }, [])

    // utnuk button edit
        // parameter yang berbetnuk object full, baru dari situ kita pisahkan nya
    const editToggle = (editData) => {
        setEditId(editData.id)
        setEditProductName(editData.productName)
        setEditPrice(editData.price)
        setEditProductImage(editData.productImage)
        setEditDescription(editData.description)
        setEditCategory(editData.category)
    }

    const inputHandler = (event, field) => {
        const {value} = event.target

        if (field === "editProductName"){
            setEditProductName(value)
        } else if (field === "editPrice") {
            setEditPrice(value)
        } else if (field === "editProductImage"){
            setEditProductImage(value)
        } else if (field === "editDescription") {
            setEditDescription(value)
        } else if (field === "editCategory"){
            setEditCategory(value)
        } else if (field === "addProductName") {
            setAddProductName(value)
        } else if (field === "addPrice") {
            setAddPrice(value)
        } else if (field === "addProductImage") {
            setAddProductImage(value)
        } else if (field === "addDescription") {
            setAddDescription(value)
        } else if (field === "addCategory") {
            setAddCategory(value)
        }
    }

    //utk btn save
    const saveBtnHandler = () => {
        axiosInstance.patch(`/products/${editId}` , {
            productName : editProductName,
            price : parseInt(editPrice),
            productImage : editProductImage,
            description : editDescription,
            category : editCategory
        })
        .then(() => {
            alert("berhasil merubah data")
            fetchProduct()
            cancelEdit()
        })
        .catch((err) => {
            alert(err)
        })
    }

    // utk btn delete
    const deleteBtnHandler = (deleteId) => {
        const confirmDelete = window.confirm ("nyakin delete barang?")

        // jika dpt iya berarti true
        if(confirmDelete) {
            axiosInstance.delete(`/products/${deleteId}`)
            .then(() => {
                fetchProduct()
            })
            .catch((err) => {
                alert(err)
            })
        } else {
            cancelEdit()
        }
    }

        // utk mengcancel
    const cancelEdit = () => {
        setEditId(0) // seperti nya angka 0 memliki fungsi utk memebalikan ke kondisi normal sebelum ada perubahan
    }

    //render product
    const renderProduct = () => {
        return ProductList.map((val) => {
            if(val.id === editId){
                return (
                    <tr>
                    <td>{val.id}</td>
                    <td><input value={editProductName} onChange={(e) => inputHandler(e , "editProductName")} type="text" name='editProductName' className='form-control'/></td>
                    <td><input value={editPrice} onChange={(e) => inputHandler(e , "editPrice")} type="text" name='editPrice' className='form-control'/></td>
                    <td><input value={editProductImage} onChange={(e) => inputHandler(e , "editPrice")} type="text" name='editProductImage' className='form-control'/></td>
                    <td><input value={editDescription} onChange={(e) => inputHandler(e , "editDescription")} type="text" name='editDescription' className='form-control'/></td>
                    <td>
                        <select value={editCategory} onChange={(e) => inputHandler(e , "editCategory")} name="editCategory" className='form-control'>
                            <option value="">All Items</option>
                            <option value="kaos">Kaos</option>
                            <option value="celana">Celana</option>
                            <option value="aksesoris">Aksesoris</option>
                        </select>
                    </td>
                    <td>
                        <button onClick={saveBtnHandler} className='btn btn-success'>Save</button>
                    </td>
                    <td>
                        <button onClick={cancelEdit} className='btn btn-danger'>Cancel</button>
                    </td>
                </tr>
                )
            }
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.productName}</td>
                    <td>{val.price}</td>
                    <td><img className='admin-product-image ' src={val.productImage} alt="" /></td>
                    <td>{val.description}</td>
                    <td>{val.category}</td>
                    <td>
                        <button onClick={() => editToggle(val)} className='btn btn-secondary'>Edit</button>
                    </td>
                    <td>
                        <button onClick={() => deleteBtnHandler(val.id)} className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const addNewProduct = () => {
        axiosInstance.post("/products" , {
            productName: addProductName,
            price: parseInt(addPrice),
            productImage : addProductImage,
            description : addDescription,
            category : addCategory
        })
        .then((result) => {
            fetchProduct()
            // kosongkan lagi isi field ya
            setAddProductName("")
            setAddPrice(0)
            setAddCategory("")
            setAddDescription("")
            setAddCategory("")
        })
        .catch((err) => {
            alert(err)
        })
    }

    return (
        <div>
                <div className="p-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>Manage Products</h1>
                            <table className='table mt-4'>
                                <thead className='thead-light'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th colSpan='2'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProduct()}
                                </tbody>
                                <tfoot className='bg-light'>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input value={addProductName} onChange={(e) => inputHandler(e , "addProductName")} name='addProductName' type="text" className='form-control' />
                                        </td>
                                        <td>
                                            <input value={addPrice} onChange={(e) => inputHandler(e , "addPrice")} name='addPrice' type="number" className='form-control' />
                                        </td>
                                        <td>
                                            <input value={addProductImage} onChange={(e) => inputHandler(e , "addProductImage")} name='addProductImage' type="text" className='form-control' />
                                        </td>
                                        <td>
                                            <input value={addDescription} onChange={(e) => inputHandler(e , "addDescription")} name='addDescription' type="text" className='form-control' />
                                        </td>
                                        <td>
                                            <select onChange={(e) => inputHandler(e , "addCategory")} name="addCategory" className='form-control'>
                                                <option value="">All Items</option>
                                                <option value="kaos">Kaos</option>
                                                <option value="celana">Celana</option>
                                                <option value="aksesoris">Aksesoris</option>
                                            </select>
                                        </td>
                                        <td colSpan="2">
                                            <button onClick={addNewProduct} className='btn btn-info'>Add Product</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default Admin
