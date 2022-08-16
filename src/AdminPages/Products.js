import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPagination from 'react-paginate';

function Products() {

    const [ProductData, setProductData] = useState([]);
    const [Availability, setAvailability] = useState();
    const [ProductId, setProductId] = useState('')
    const [ProductUID, setProductUID] = useState('')
    const [UpdateId, setUpdateId] = useState('');
    const [Product, setProduct] = useState('');


    const [catagroy, setcatagroy] = useState();
    const [name, setname] = useState();
    const [range, setrange] = useState();
    const [Sort, setSort] = useState(false)
    const [PageNumber, setPageNumber] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        GetProductData();
    }, [])


    const GetProductData = (e) => {

        setSort(true);

        const pk = {
            catagroy: catagroy,
            search: name,
            range: range,
            order : Sort
        }
        axios.post("http://localhost:2022/prize/range", pk).then((data) => {
            console.log(data)
            setProductData(data?.data?.response?.result)
        }).catch((err) => {
            console.log(err)
        })

    }

    const posted = (e) => {
        e.preventDefault();
        navigate('/admindash')
    }

    const trigger = (e) => {
        var elems = document.querySelectorAll('.modal');
        var trigg = M.Modal.init(elems, {});
    }


    const AvailabilityUpdate = (e) => {

        e.preventDefault();

        const pp = {
            availability: Availability
        }

        axios.post(`http://localhost:2022/admin/product/change/${ProductId}`, pp).then((data) => {
            console.log(data);
            if (data.data.status === 1) {
                alert(data.data.message)
                GetProductData();
            } else {
                alert("Product Won't Change!!")
            }
        })
    }

    const geter = () => {
        var elems = document.querySelectorAll('.modal');
        var trig = M.Modal.init(elems, {});
    }

    const trigg = () => {
        var elems = document.querySelectorAll('.modal');
        var trig = M.Modal.init(elems, {});
    }


    const HandleChange = (e) => {
        const id = e.target.id;
        const values = e.target.value;

        setProduct((prevState) => ({
            ...prevState,
            [id]: values,
        }))
    }

    const DeleteProduct = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:2022/admin/product/delete/${ProductUID}`).then((data) => {
            console.log(data)
            if (data.data.status === 1) {
                alert(data.data.message)
                GetProductData();
            } else {
                alert('something went to wrong!!!')
            }
        })
    }


    const HandleUpdate = (e) => {

        e.preventDefault();

        axios.post(`http://localhost:2022/admin/product/update/${UpdateId}`, Product).then((data) => {
            console.log(data)

            if (data.data.status === 1) {
                alert(data.data.message)
                GetProductData();
            }
            else {
                alert("Product Doesn't Update")
            }
        })
    }

    const V1 = 2000;
    const V2 = 8000;
    const V3 = 20000;
    const V4 = 50000;
    const V5 = 100000;


    const HandlePageClick = ({ selected }) => {
        setPageNumber(selected);
    }

    const userPerPage = 4;
    const PageVisited = PageNumber * userPerPage;
    const page = Math.ceil(ProductData.length / userPerPage);

    const displayUsers = ProductData.slice(PageVisited, PageVisited + userPerPage).map((datas) => {


        return (<div>
            <div class="col s3">
                <div class="card lime accent-3 z-depth-4  tooltipped" data-position="top" data-tooltip="View Our Product">
                    <div class="card-image">
                        <img src={`http://localhost:2022/${datas.photo}`} style={{ width: "300px", height: "200px" }} className='responsive-img' />
                        <a class="btn-floating halfway-fab waves-effect orange darken-3 modal-trigger" data-target="change2" onClick={(e) => {
                            setProductUID(datas._id)
                            geter();
                        }}><i class="material-icons">cancel</i></a>
                    </div>
                    <div class="card-content">

                        <p className='style3'>Product Name :{datas.name}</p>
                        <p className='style3'>Prize :&nbsp; Rs.&nbsp;<span className='style8'>{datas.prize}</span> /-- </p>
                        <p className='style3'>OfferPrize :&nbsp;Rs. &nbsp;{datas.offerprize} /--</p>
                        <p className='style3'>Discount : &nbsp;{datas.discount}&nbsp;%</p><hr />

                        <div className='row'>
                            <div className='col s6'>
                                <p className='style3 left'>{datas.availability === "true" ? (<div style={{ color: "green" }}>Instock</div>) : (<div style={{ color: "red" }}>OutOfStock</div>)}</p>
                            </div>
                            <div className='col s6'>
                                <button className='btn modal-trigger green accent-4' data-target="change1" onClick={(e) => {
                                    setProductId(datas._id)
                                    trigger()
                                }}>Change</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div class="card-action center">
                        <button className='btn grey modal-trigger darken-4 style5' data-target="change3" onClick={() => {
                            setUpdateId(datas._id);
                            setProduct({
                                catagroy: datas.catagroy,
                                name: datas.name,
                                prize: datas.prize,
                                offerprize: datas.offerprize,
                            })
                            trigg();
                        }}>Update</button>
                    </div>
                </div>
            </div>
        </div>)


    })


    return (
        <div>
            <nav className='orange'>
                <div className="nav-wrapper container">
                    <a href="" className="brand-logo">DevShip</a>
                    <ul className="right">
                        <li><a href="">Order</a></li>
                        <li><a href="" onClick={posted}>dashboard</a></li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <h5 className='center'> Products</h5>
                <div className='row'>
                    <div className='col s3 center'>
                        <select id='range' className="browser-default style10" name='range' onChange={(e) => setcatagroy(e.target.value)} required>
                            <option >Catagroy</option>
                            <option>Mobile</option>
                            <option>Shoe</option>
                            <option>Shirt</option>
                        </select>
                    </div>
                    <div className='col s3 center'>
                        <select id='range' className="browser-default style10" onChange={(e) => setrange(e.target.value)} name='range' required>
                            <option >All Prices</option>
                            <option value={V1} >less then 2000</option>
                            <option value={V2} >less then 8000</option>
                            <option value={V3}>less 20000</option>
                            <option value={V4}>less 50000</option>
                            <option value={V5}>less 100000</option>
                        </select>
                    </div>
                    <div className="input-field col s3">
                        <input type="text" className="validate" onChange={(e) => setname(e.target.value)} required />
                        <label>Search Product</label>
                    </div>
                    <div className='col s3 right'>
                        <button className='btn indigo style11' value={Sort} onClick={GetProductData} >sort</button>&nbsp;&nbsp;
                        <button className='btn indigo style11' onClick={GetProductData} >search</button>
                    </div>
                </div>
                <div class="row">
                    <hr />
                    {displayUsers}
                </div>

                <div id="change1" className="modal cyan lighten-3">
                    <form encType="multipart/form-data" >
                        <div className="modal-content">
                            <h4 className='center'>Availability</h4>
                            <div className="row">
                                <div className='col s6'>
                                    <p>
                                        <label>
                                            <input type="checkbox" id="dd" value="true" onChange={(e) => setAvailability(e.target.value)} name="availability" />
                                            <span>Instock</span>
                                        </label>
                                    </p>
                                </div>
                                <div className='col s6'>
                                    <p>
                                        <label>
                                            <input type="checkbox" id="hh" value="false" onChange={(e) => setAvailability(e.target.value)} name="availability" />
                                            <span>Outofstock</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer cyan lighten-3">
                            <button type='submit' className='btn center indigo modal-close' onClick={AvailabilityUpdate} >Update</button>
                        </div>
                    </form>
                </div>

                <div id="change2" className="modal lime accent-3 z-depth-4">
                    <form>
                        <div className="modal-content">
                            <h4 className='center'>Delete Product</h4>
                            <p className='center'>Are You Sure ? you wnat to Delete the Product...!!!</p>
                        </div>
                        <div className="modal-footer lime accent-3 z-depth-4">
                            <button type='submit' className='btn mod  indigo' onClick={DeleteProduct}>Delete</button>
                        </div>
                    </form>
                </div>


                <div id="change3" className="modal cyan lighten-3">
                    <form encType="multipart/form-data">
                        <div className="modal-content">
                            <h4 className='center'>Update Product</h4>
                            <div className="row">
                                <div className='input-field col s6'>
                                    <select id='catagroy' className="browser-default cyan lighten-4 style2" value={Product.catagroy} onChange={HandleChange} name='catagroy' required>
                                        <option >Select Catagroy</option>
                                        <option >Mobile</option>
                                        <option >Shoe</option>
                                        <option >Shirt</option>
                                    </select>
                                </div>
                                <div className="input-field col s6">
                                    <input type="text" className="validate" id='name' value={Product.name} onChange={HandleChange} name="name" required />
                                    <label for="Adminpassword"></label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input type="text" className="validate" id='prize' value={Product.prize} onChange={HandleChange} name="prize" required />
                                    <label></label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input type="text" className="validate " id='offerprize' value={Product.offerprize} onChange={HandleChange} name="offerprize" required />
                                    <label></label>
                                </div>
                            </div>
                            <input type='file' className='cyan lighten-4' name='photo' id='ss' accept=".png, .jpeg, .jpg" />
                        </div>
                        <div className="modal-footer cyan lighten-3">
                            <button type='submit' className='btn center indigo' onClick={HandleUpdate}>Upload</button>
                        </div>
                    </form>
                </div>

                <div className='center'>
                    <ReactPagination
                        previousLabel={"Prev"}
                        pageCount={page}
                        onPageChange={HandlePageClick}
                        containerClassName={"pagination style12"}
                        pageClassName={"waves-effect"}
                        activeClassName={"active indigo"}
                        previousLinkClassName={"style13"}
                        nextLinkClassName={"style14"}
                    />
                </div>

            </div>


        </div>
    )
}

export default Products