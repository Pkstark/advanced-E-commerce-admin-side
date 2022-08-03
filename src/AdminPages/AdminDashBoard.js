import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Img from '../Assets/image2.jpg';

function AdminDashBoard() {

    const [Data, setData] = useState([])

    const navigate = useNavigate()

    const [CreateProduct, setCreateProduct] = useState('')


    const email = localStorage.getItem("adminemail")

    const posted = (e) => {
        e.preventDefault();

        let elems = document.querySelectorAll('.modal');
        let trigg = M.Modal.init(elems, {})
    }


    useEffect(() => {
        getData();
    }, [])


    const getData = () => {
        const pk = {
            email: email
        }
        axios.post('http://localhost:2022/admin/getdata', pk).then((data) => {
            console.log(data)
            setData(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const ProductUpload = (e) => {
        e.preventDefault();

        console.log(CreateProduct.availability)

        const formData = new FormData();

        formData.append('catagroy', CreateProduct.catagroy);
        formData.append('name', CreateProduct.name);
        formData.append('prize', CreateProduct.prize);
        formData.append('offerprize', CreateProduct.offerprize);
        formData.append('availability', CreateProduct.availability);
        formData.append('photo', CreateProduct.photo)


        axios.post("http://localhost:2022/admin/create/product", formData).then((data) => {
            console.log(data)
            if (data.data.Status === 1) {
                alert(data.data.message)
            } else {
                alert("Something Wrong")
            }
        })

        document.getElementById('kk').value = null;
        document.getElementById('k').value = null;
        document.getElementById('ff').value = null;
        document.getElementById('f').value = null;
        document.getElementById('ss').value = null;
        document.getElementById('s').value = null;
    }

    const HanldePhoto = (e) => {
        setCreateProduct({ ...CreateProduct, photo: e.target.files[0] })
    }

    const HandleChange = (e) => {
        setCreateProduct({ ...CreateProduct, [e.target.name]: e.target.value })
    }

    // const trigg = () => {
    //     var elems = document.querySelectorAll('.tap-target');
    //     var instances = M.TapTarget.init(elems, {});
    // }

    const post = () => {
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems, {});
    }

    const Push =(e) => {
        e.preventDefault();
        navigate('/product')
    }
    return (
        <div>
            <nav className='orange'>
                <div className="nav-wrapper container">
                    <a href="" className="brand-logo">DevShip</a>
                    <ul className="right">
                        <li><a href="">Create User</a></li>
                        <li><a href="">Form</a></li>
                        <li><a href="" className='modal-trigger' data-target="change" onClick={posted}>Create Product</a></li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <h5 className='center style4'>Welcome to Devship,&nbsp;&nbsp; {Data.username}</h5>
            </div><br/><br/><br/>

            <div className='container'>
                <div class="row">
                    <div class="col s12 m4">
                        <div class="card lime accent-3 z-depth-4  tooltipped"  data-position="top" data-tooltip="View Our Product" onMouseEnter={post}>
                            <div class="card-image">
                                <img src={Img} className='responsive-img' />
                                <span class="card-title">Products</span>
                            </div>
                            <div class="card-content">
                                <p className='style3'>We Have a Verity of Product see More</p>
                            </div>
                            <div class="card-action center">
                                <button className='btn grey darken-4 style5' onClick={Push}>View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="change" className="modal cyan lighten-3">
                <form encType="multipart/form-data" onSubmit={ProductUpload} >
                    <div className="modal-content">
                        <h4 className='center'>Create Product</h4>
                        <div className="row">

                            <div className='input-field col s6'>
                                <select id='f' className="browser-default cyan lighten-4 style2" name='catagroy' onChange={HandleChange} required>
                                    <option>Select Catagroy</option>
                                    <option>Mobile</option>
                                    <option>Shoe</option>
                                    <option >Shirt</option>
                                </select>
                            </div>
                            <div className="input-field col s6">
                                <input type="text" className="validate" id='kk' name="name" onChange={HandleChange} required />
                                <label for="Adminpassword">Product Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" className="validate" id='k' name="prize" onChange={HandleChange} required />
                                <label>Product Prize</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" className="validate " id='ff' name="offerprize" onChange={HandleChange} required />
                                <label>Product offer Prize</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col s6'>
                                <p>
                                    <label>
                                        <input type="checkbox" id='f' value={true} onChange={HandleChange} name="availability" />
                                        <span>Instock</span>
                                    </label>
                                </p>
                            </div>
                            <div className='col s6'>
                                <p>
                                    <label>
                                        <input type="checkbox" id='s' value={false} onChange={HandleChange} name="availability" />
                                        <span>Outofstock</span>
                                    </label>
                                </p>
                            </div>
                        </div>

                        <input type='file' className='cyan lighten-4' name='photo' id='ss' onChange={HanldePhoto} accept=".png, .jpeg, .jpg" />
                    </div>
                    <div className="modal-footer cyan lighten-3">
                        <button type='submit' className='btn center indigo'>Upload</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default AdminDashBoard