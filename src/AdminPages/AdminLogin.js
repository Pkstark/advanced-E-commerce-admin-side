import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import Img from '../Assets/image1.jpg';

function AdminLogin() {

  const [AdminEmail, setAdminEmail] = useState('');
  const [AdminPassword, setAdminPassword] = useState('');

  const navigate = useNavigate()

    const Adminhandle = (e) => {
        e.preventDefault();

        window.localStorage.setItem('adminemail' , AdminEmail)
        const pk ={
          email : AdminEmail,
          password : AdminPassword
        }
        axios.post("http://localhost:2022/admin/login",pk).then((data) => {
          console.log(data)
          alert(data.data.response)
          if(data.data.status === 1){
            navigate('/admindash')
          }
        }).catch((err) => {
          console.log(err)
        })
    }


  return (
    <div className='body'>
        <div className='row s12'>

          <div className='col s6'>
            <img src={Img} alt="jj" className='style1' />
          </div>
          
          <div className='col s6'>
          <form onSubmit={Adminhandle}>
            <div className='card '>
              <div className='card-content'><br /><br />
                <h5 className='center'>Admin Login</h5><br /><br />
                <div className="row">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>email</i>
                    <input id="i" type="text" className="validate" required name='email' onChange={(e) => setAdminEmail(e.target.value)} />
                    <label for="username">Admin Email</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <i className='material-icons prefix'>visibility</i>
                    <input id="j" type="text" className="validate" required name='password' onChange={(e)=> setAdminPassword(e.target.value)}/>
                    <label for="username">Admin Password</label>
                  </div>
                </div>
                <p className='center' style={{color : "red"}}> <a href='/' >Forgot Password ?</a></p><br/>
              </div><br /><br />
              <div className='card-action center'><br />
                <button type='submit' className='btn'>Admin Login</button>
              </div>
              <br />
              <br /><br /><br /><br /><br />
            </div>
          </form>
        </div>

        </div>
    </div>
  )
}

export default AdminLogin