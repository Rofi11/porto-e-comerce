import React, { Component } from 'react';
import {link} from "react-router-dom"
import Axios from 'axios';
import { axiosInstance } from '../configs/API';
import ProductCard from '../componets/ProductCard';
import MyNavBar from '../componets/MyNavbar';


class Home extends Component{
    state = {
        filteredProductList: [],
        productList: [],
        page : 1 ,
        maxPage : 0,
        itemPerPage : 5,
        searchProductName: "",
        searchCategory: "",
        sortBy: ""
    }

    // utk fecthing data/ request data
    fetchProducts = () => {
        //ambil data
        axiosInstance.get("/users/products")
        .then((result) => {
            this.setState({
                productList : result.data,
                maxPage : Math.ceil(result.data.length / this.state.itemPerPage),
                filteredProductList : result.data
            })
        })
        .catch((err) => {
            alert(err)
        })
    }

    //utk render products menggunakan map (looping nya)
    renderProducts = () => {
        const beginningIndex = (this.state.page - 1) * this.state.itemPerPage

        let rawData = [ ...this.state.filteredProductList] // make cloning, karena tidak boleh memanipulasi kalo ga di seSstate at react.js, makanya di masukan ke dalam variabel

        // utk compare data string a-z dan z-a
        const compareString = (a, b) => {
            if(a.productName < b.productName){
                return -1
            }

            if (a.productName > b.productName) {
                return 1
            }

            return 0
        }
        //pengkondisian sort
        switch (this.state.sortBy) {
            case "lowPrice":
                rawData.sort((a, b) => a.price - b.price)
                break;
            case "highPrice":
                rawData.sort((a, b) => b.price - a.price)
                break;
            case "az":
                rawData.sort(compareString)
                break;
            case "za":
                rawData.sort((a,b) => compareString(b, a))
                break;
            default:
                rawData = [ ...this.state.filteredProductList]
                break;
        }
        const currentData = rawData.slice(beginningIndex, beginningIndex + this.state.itemPerPage)
        return currentData.map((val) => {
            // yg di return harus kirim props utk kirim ke child component
            return <ProductCard productData={val}/>
        })
    }
    
    //pagination
    nextPageHandler = () => {
        if(this.state.page < this.state.maxPage){
            this.setState({page : this.state.page + 1})
        }
    }

    previousPageHandler = () => {
        if(this.state.page > 1){
            this.setState({page : this.state.page - 1})
        }
    }

    //utk handle inputan search
    inputHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name] : value })
    }
    // button search handler
    searchbtnHandler = () => {
        const filteredProductList = this.state.productList.filter((val) => {
            return val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) && val.category.toLowerCase().includes(this.state.searchCategory.toLowerCase())
        })

        //isi array kosong di atas dengan data ini
        this.setState({filteredProductList, maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage), page : 1})
    }

    // lifecyle method utk memnaggil data realtime ketika masuk
    componentDidMount() {
        this.fetchProducts()
    }

    render() {
        return (
            <div className='containerx'>
                <MyNavBar/>
                <div className="row">
                    <div className="col-3">
                        {/* card filter */}
                        <div className="card">
                            <div className="card-header">
                                <strong>Filter Products</strong>
                            </div>
                            <div className="card-body">
                                <label htmlFor="searchProductName">Product Name</label>
                                <input 
                                    onChange={this.inputHandler}
                                    name='searchProductName'
                                    type="text"
                                    className='form-control mb-3'
                                />
                                <label htmlFor="searchCategory">Product Category</label>
                                <select onChange={this.inputHandler} name="searchCategory" className='form-control'>
                                    <option value="">All Items</option>
                                    <option value="kaos">Kaos</option>
                                    <option value="celana">Celana</option>
                                    <option value="aksesoris">Aksesoris</option>
                                </select>
                                <button onClick={this.searchbtnHandler} className='btn btn-primary mt-3'>
                                    Search
                                </button>
                            </div>
                        </div>   
                            {/* card sort */}
                        <div className="card mt-4">
                            <div className="card-header">
                                <strong>Sort Products</strong>
                            </div>
                            <div className="card-body">
                                <label htmlFor="sortBy">Sort by</label>
                                <select onChange={this.inputHandler } name="sortBy" className='form-control'>
                                    <option value="">Default</option>
                                    <option value="lowPrice">Lowest Price</option>
                                    <option value="highPrice">Highest Price</option>
                                    <option value="az">A-Z</option>
                                    <option value="za">Z-A</option>
                                </select>
                            </div>
                        </div>
                        {/* utk button arah */}
                        <div className="mt-3">
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <button onClick={this.previousPageHandler} disabled={this.state.page === 1} className='btn btn-dark'>
                                    {"<"}
                                </button>
                                <div className="text-center">Page {this.state.page} of {this.state.maxPage}</div>
                                <button onClick={this.nextPageHandler} disabled={this.state.page === this.state.maxPage} className='btn btn-dark'>
                                    {">"}
                                </button>                               
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className='d-flex flex-wrap flex-row'>
                            {/* render product here */}
                            {this.renderProducts()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;