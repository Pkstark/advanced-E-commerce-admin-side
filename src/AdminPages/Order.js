import axios from 'axios';
import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useNavigate } from 'react-router-dom';

function Order() {
  const navigate = useNavigate();

  const [userData, setuserData] = useState([]);
  const [OrederId, setOrederId] = useState('')

  const Posted = (e) => {
    e.preventDefault();
    navigate('/admindash')
  }

  useEffect(() => {
    getData();
  }, [])


  const email = localStorage.getItem('email')


  const getData = () => {
    const pk = {
      email: email
    }
    axios.post("http://localhost:2022/order/clientdata", pk).then((data) => {
      console.log(data);
      setuserData(data.data)
    }).catch((err) => {
      console.log(err)
    })

  }

  const getTrig = () => {
    var elem = document.querySelectorAll('.modal');
    var ins = M.Modal.init(elem,{})
  }

  const CancelOrder = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:2022/order/delete/${OrederId}`).then((data) => {
      console.log(data);
      getData();
      if(data.data.status === 1) {
        alert(data.data.message)
      }else{
        alert("Wrong")
      }
    })
  }

  return (
    <div>
      <nav className='orange'>
        <div className="nav-wrapper container">
          <a href="" className="brand-logo">DevShip</a>
          <ul className="right">
            <li><a href="" onClick={Posted}>Dashboard</a></li>
          </ul>
        </div>
      </nav>


      <div className='container'>
        <h5 className='center'>Your Order Details</h5><br/>
        {userData.map((datas) => {
          return (<div>
            <div className='card'>
              <div className='card-content'>
                <div className='row s12'>
                  <div className='col s3 center'>
                    <img  src={`http://localhost:2022/${datas.photo}`} style={{ height: "150px", width: "150px" }} />
                  </div>
                  <div className='col s3'>
                    <h5 className='center'>Product Details</h5>
                    <p className='style3'>Product Catagroy : &nbsp; {datas.catagroy}</p>
                    <p className='style3'>Product Name : &nbsp; {datas.name}</p>
                    <p className='style3'>Prize :&nbsp; Rs.&nbsp;<span className='style2'>{datas.prize}</span> /-- </p>
                    <p className='style3'>OfferPrize :&nbsp;Rs. &nbsp;{datas.offerprize} /--</p>
                    <p className='style3'>Discount : &nbsp;{datas.discount}&nbsp;%</p>
                    <p className='style3'>Quantity : &nbsp;{datas.quantity}&nbsp;</p>
                    <p className='style3'>TotalPrize : &nbsp;Rs .&nbsp;{datas.totalprize}&nbsp;/-</p>
                  </div>

                  <div className='col s3 '>
                  <h5 className='center'>Address Details</h5>
                    <p className='style3'>Flatno : &nbsp; {datas.flatno}</p>
                    <p className='style3'>line1 : &nbsp; {datas.line1}</p>
                    <p className='style3'>line2 :&nbsp;{datas.line2}</p>
                    <p className='style3'>City :&nbsp;{datas.city}</p>
                    <p className='style3'>State : &nbsp;{datas.state}&nbsp;</p>
                    <p className='style3'>Pincode : &nbsp;{datas.pincode}&nbsp;</p>
                    <p className='style3'>Phoneno : &nbsp;Rs .&nbsp;{datas.phoneno}&nbsp;</p>
                  </div>
                  <div class="col s3 ">
                    <button className='btn right style11 modal-trigger' data-target = "change" onClick={() => {
                      setOrederId(datas._id);
                      getTrig();
                    }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        })}
      </div>


      <div id="change" className="modal lime accent-3 z-depth-4">
        <form>
          <div className="modal-content">
            <h4 className='center'>Cancel Order</h4>
            <p className='center'>Are You Sure ? you wnat to Cancel this Order...!!!</p>
          </div>
          <div className="modal-footer lime accent-3 z-depth-4">
            <button type='submit' className='btn modal-close indigo' onClick={CancelOrder}>Delete</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Order