import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from "axios";

function Adduser() {

    const [First_Name, setFirst_Name] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrim_Password, setConfrim_Password] = useState("");
    const [terms, setTerms] = useState(false);


    const [userData, setuserData] = useState([]);
    const [UserId, setUserId] = useState()


    const navigate = useNavigate()

    const posted = (e) => {
        e.preventDefault();
        navigate('/admindash')
    }

    const trigg = () => {
        var elems = document.querySelectorAll('.modal');
        var trigger = M.Modal.init(elems, {});
    }

    const AddUserData = (e) => {
        e.preventDefault();


        const pp = {
            first_name: First_Name,
            surname: surName,
            email: email,
            password: password,
            confirmPassword: confrim_Password,
            agree_terms: terms
        }
        axios.post("http://localhost:2022/admin/adduser", pp).then((data) => {
            console.log(data);
            getData();
            alert("User Added Success")
        }).catch((err) => {
            console.log(err)
        })

        console.log(pp)

        let pk = document.getElementById('g');
        pk.value = "";
        let pk1 = document.getElementById('h');
        pk1.value = "";
        let pk2 = document.getElementById('i');
        pk2.value = "";
        let pk3 = document.getElementById('j');
        pk3.value = "";
        let pk4 = document.getElementById('k');
        pk4.value = "";
        let pk5 = document.getElementById('l');
        pk5.value = "";

    }

    useEffect(() => {
        getData();
    }, [])



    const getData = () => {
        axios.post("http://localhost:2022/getdata1").then((data) => {
            console.log(data);
            setuserData(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const DeleteUser = (e) => {

        e.preventDefault();
        
        axios.post(`http://localhost:2022/admin/user/delete/${UserId}`).then((data) => {
            console.log(data)
            getData();
            if(data.data.status === 1) {
                alert(data.data.message)
            }else{
                alert("wrong")
            }
        })
    }


    return (
        <div>
            <nav className='orange'>
                <div className="nav-wrapper container">
                    <a href="" className="brand-logo">DevShip</a>
                    <ul className="right">
                        <li><a href="" onClick={posted}>dashboard</a></li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                {userData != null ? (<div>
                    {userData.map((datas) => {
                        return (<>
                            <div className='card'>
                                <div className='card-content'>
                                    <p>FirstName :&nbsp;&nbsp;&nbsp;{datas.first_name}</p>
                                    <p>SurName :&nbsp;&nbsp;&nbsp;{datas.surname}</p>
                                    <button className='btn right red modal-trigger' data-target="change1" onClick={(e) => {
                                        setUserId(datas._id);
                                        trigg();
                                    }}>Delete</button>
                                    <p>Email :&nbsp;&nbsp;&nbsp;{datas.email}</p>
                                </div>
                            </div>
                        </>
                        )
                    })}
                </div>) : (<div>
                    <div className='card container'>
                        <div className='card-contant center'>
                            <h4>No Users Data Please Add!!</h4>
                        </div>
                    </div>
                </div>)}
            </div>

            <div className="fixed-action-btn">
                <a className="btn-floating btn-large green">
                    <i className="large material-icons modal-trigger" data-target="change" onClick={trigg}>add</i>
                </a>
            </div>


            <div id="change" className="modal">
                <form encType="multipart/form-data" onSubmit={AddUserData}>
                    <div className="modal-content">
                        <h4 className='center'>Add User</h4>

                        <div className="row">
                            <div className="input-field col s6">
                                <i className='material-icons prefix'>account_circle</i>
                                <input id="g" type="text" className="validate" required name='firstName' onChange={(e) => setFirst_Name(e.target.value)} />
                                <label for="username">First_Name</label>
                            </div>

                            <div className="input-field col s6">
                                <i className='material-icons prefix'>account_circle</i>
                                <input id="h" type="text" className="validate" required name='surname' onChange={(e) => setSurName(e.target.value)} />
                                <label for="username">SurName</label>
                            </div>

                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <i className='material-icons prefix'>email</i>
                                <input id="i" type="text" className="validate" required name='email' onChange={(e) => setEmail(e.target.value)} />
                                <label for="username">Email</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6">
                                <i className='material-icons prefix'>visibility</i>
                                <input id="j" type="text" className="validate" required name='password' onChange={(e) => setPassword(e.target.value)} />
                                <label for="username">Password</label>
                            </div>

                            <div className="input-field col s6">
                                <i className='material-icons prefix'>visibility</i>
                                <input id="k" type="text" className="validate" required name='confrimpassword' onChange={(e) => setConfrim_Password(e.target.value)} />
                                <label for="username">confirm_Password</label>
                            </div>
                        </div>

                        <p className='center'>
                            <label>
                                <input id='l' value={true} name="term" type="checkbox" onChange={(e) => setTerms(e.target.value)} required />
                                <span>Agree terms and Conditions</span>
                            </label>
                        </p><br />

                    </div>
                    <div className="modal-footer">
                        <button type='submit' className='btn center'>Add User</button>
                    </div>
                </form>
            </div>


            <div id="change1" className="modal lime accent-3 z-depth-4">
                <form>
                    <div className="modal-content">
                        <h4 className='center'>Delete User</h4>
                        <p className='center'>Are You Sure ? you wnat to Delete the User...!!!</p>
                    </div>
                    <div className="modal-footer lime accent-3 z-depth-4">
                        <button type='submit' className='btn mod  indigo' onClick={DeleteUser}>Delete</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Adduser