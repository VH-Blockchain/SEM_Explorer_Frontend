import { Box } from '@mui/material';
import React , { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();


  async function UserSignup(e:any) {
    e.preventDefault();
    const body = {"FirstName": firstname, "LastName":lastname, "email": email, "password":password}
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "FirstName": firstname,
      "LastName": lastname,
      "email": email,
      "password": password
    });
    
    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/sign-up`, requestOptions)
      .then(response =>  response.json())
      .then(result =>{
        return result})
      .catch(error => console.log('error', error));

    if(response.code == 200){
      toast.success(`⛏️ ${response.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
        setTimeout(() => {
          window.location.href = "#/sign-in";
        }, 600);
        console.log(response);
    }

    if(response.code == 400){
      console.log("error message")
      toast.error(`${response.message}`,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }
}

  return (
    <Box className="container-wrape">
        <div className="auth-wrapper">
          <div className="auth-inner">
    <form onSubmit={UserSignup}>
      <ToastContainer />
        <h3>Sign Up</h3>

        <div className="mb-2">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value= {firstname}
            onChange={(e:any) => setfirstname(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" value={lastname} onChange={(e:any) => setlastname(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e:any) => setemail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e:any)=>setpassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already have an account? <a href="/sign-in">sign in here</a>
        </p>
      </form>
      </div>
      </div>
      </Box>
  )
}
export default Signup;