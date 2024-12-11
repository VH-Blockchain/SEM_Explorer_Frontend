import { Box } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "First name should be at least 2 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Last name should be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Signup = () => {
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();


  async function UserSignup(values: any) {
    const { firstname, lastname, email, password } = values;

    // e.preventDefault();
    const body = { "FirstName": firstname, "LastName": lastname, "email": email, "password": password }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "FirstName": firstname,
      "LastName": lastname,
      "email": email,
      "password": password
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/sign-up`, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));

    if (response.code == 200) {
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

    if (response.code == 400) {
      console.log("error message")
      toast.error(`${response.message}`, {
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
          <Formik
            initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={UserSignup}
          >
            {({
              isSubmitting
            })=>(
              <Form>
                <ToastContainer />
                <h3>Sign Up</h3>

                <div className="mb-2">
                  <label>First name</label>
                  <Field
                    type="text"
                    name='firstname'
                    className="form-control"
                    placeholder="First name"
                    // value={firstname}
                    // onChange={(e: any) => setfirstname(e.target.value)}
                  />
                  <ErrorMessage name="firstname" component="div" className="text-danger" />
                </div>

                <div className="mb-2">
                  <label>Last name</label>
                  <Field
                   type="text" 
                    name='lastname'
                   className="form-control" 
                   placeholder="Last name"
                    // value={lastname} 
                    // onChange={(e: any) => setlastname(e.target.value)} 
                    />
                  <ErrorMessage name="lastname" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label>Email address</label>
                  <Field
                    type="email"
                    name='email'
                    // value={email}
                    // onChange={(e: any) => setemail(e.target.value)}
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    // value={password}
                    // onChange={(e: any) => setpassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Already have an account? <Link to={`/sign-in`}>sign in here</Link>
                </p>
              </Form>
            )}

          </Formik>
        
        </div>
      </div>
    </Box>
  )
}
export default Signup;