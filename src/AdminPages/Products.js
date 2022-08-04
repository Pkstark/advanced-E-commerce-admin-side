import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Products() {

    const [ProductData, setProductData] = useState([]);
    const [Availability, setAvailability] = useState();
    const [ProductId, setProductId] = useState('')
    const [ProductUID, setProductUID] = useState('')
    const [UpdateId, setUpdateId] = useState('');

    const [Product, setProduct] = useState('');
    


    const navigate = useNavigate()

    useEffect(() => {
        GetProductData();
    }, [])


    const GetProductData = (e) => {
        axios.post("http://localhost:2022/admin/products").then((data) => {
            console.log(data);
            setProductData(data.data)
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

        axios.post(`http://localhost:2022/admin/product/update/${UpdateId}`,Product).then((data) => {
            console.log(data)

            if(data.data.status === 1) {
                alert(data.data.message)
                GetProductData();
            }
            else{
                alert("Product Doesn't Update")
            }
        })
    }


    // const posted1 = (e) => {
    //     var elems = document.querySelectorAll('.tabs');
    //     var tt = M.Tabs.init(elems, {})
    // }

    // const posted2 = (e) => {
    //     var elems = document.querySelectorAll('.tabs');
    //     var tt = M.Tabs.init(elems, {})
    // }

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
                <div class="row">
                    <div className='center style6'>
                        <h4>Products</h4>
                    </div><hr />
                    {ProductData.map((datas) => {
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
                                                <p className='style3 left'>{datas.availability === true ? (<div style={{ color: "green" }}>Instock</div>) : (<div style={{ color: "red" }}>OutOfStock</div>)}</p>
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
                                                catagroy : datas.catagroy,
                                                name : datas.name,
                                                prize : datas.prize,
                                                offerprize : datas.offerprize,
                                            })
                                            trigg();
                                        }}>Update</button>
                                    </div>
                                </div>


                                <div id="change1" className="modal cyan lighten-3">
                                    <form encType="multipart/form-data" >
                                        <div className="modal-content">
                                            <h4 className='center'>Availability</h4>
                                            <div className="row">
                                                <div className='col s6'>
                                                    <p>
                                                        <label>
                                                            <input type="checkbox" id="dd" value={true} onChange={(e) => setAvailability(e.target.value)} name="availability" />
                                                            <span>Instock</span>
                                                        </label>
                                                    </p>
                                                </div>
                                                <div className='col s6'>
                                                    <p>
                                                        <label>
                                                            <input type="checkbox" id="hh" value={false} onChange={(e) => setAvailability(e.target.value)} name="availability" />
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

                            </div>
                        </div>)
                    })}
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
                    <form encType="multipart/form-data" >
                        <div className="modal-content">
                            <h4 className='center'>Update Product</h4>
                            <div className="row">

                                <div className='input-field col s6'>
                                    <select id='catagroy' className="browser-default cyan lighten-4 style2" value={Product.catagroy} onChange ={HandleChange} name='catagroy' required>
                                        <option >Select Catagroy</option>
                                        <option >Mobile</option>
                                        <option >Shoe</option>
                                        <option >Shirt</option>
                                    </select>
                                </div>
                                <div className="input-field col s6">
                                    <input type="text" className="validate" id='name' value={Product.name} onChange ={HandleChange} name="name" required />
                                    <label for="Adminpassword"></label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input type="text" className="validate" id='prize' value={Product.prize} onChange ={HandleChange}  name="prize"  required />
                                    <label></label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input type="text" className="validate " id='offerprize' value={Product.offerprize} onChange ={HandleChange} name="offerprize" required />
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


            </div>


        </div>
    )
}

export default Products