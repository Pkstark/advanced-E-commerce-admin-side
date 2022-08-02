import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios';

function AdminDashBoard() {

    const [Data, setData] = useState([])


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
            email : email
          }
          axios.post('http://localhost:2022/admin/getdata',pk).then((data) => {
            console.log(data)
            setData(data.data)
          }).catch((err) => {
            console.log(err)
          })
      }
    
    return (
        <div>


            {/* <ul id="dropdown1" className="dropdown-content">
  <li><a href="">one</a></li>
  <li><a href="">two</a></li>
</ul> */}


            <nav className='orange'>
                <div className="nav-wrapper container">
                    <a href="" className="brand-logo">DevShip</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="">Create User</a></li>
                        <li><a href="">Form</a></li>
                        <li><a href="" className='modal-trigger' data-target="change" onClick={posted}>Create Product</a></li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
            <h5 className='center'>Welcome to Devship,&nbsp;&nbsp; {Data.username}</h5>
            </div>

            <div id="change" className="modal">
                <form encType="multipart/form-data" >
                    <div className="modal-content">
                        <h4 className='center'>Create Product</h4>
                        <div className="row">

                            <div className='input-field col s6'>
                                <select id='f' className="browser-default" name='select' required>
                                    <option>Mobile</option>
                                    <option>Shoe</option>
                                    <option >Shirt</option>
                                </select>
                            </div>
                            <div className="input-field col s6">
                                <input type="text" className="validate" id='ss' name="name" required />
                                <label for="Adminpassword">Product Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" className="validate" id='ww' name="prize" required />
                                <label>Product Prize</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" className="validate" id='w' name="offerprize" required />
                                <label>Product offer Prize</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col s6'>
                                <p>
                                    <label>
                                        <input type="checkbox" value={true} name="availability" />
                                        <span>Instock</span>
                                    </label>
                                </p>
                            </div>
                            <div className='col s6'>
                                <p>
                                    <label>
                                        <input type="checkbox" value={false} name="availability" />
                                        <span>Outofstock</span>
                                    </label>
                                </p>
                            </div>
                        </div>

                        <input type='file' name='photo' id='ff' accept=".png, .jpeg, .jpg" />
                    </div>
                    <div className="modal-footer">
                        <button type='submit' className='btn center'>Upload</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default AdminDashBoard