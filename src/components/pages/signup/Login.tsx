import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");


  async function LoginUser(values: { email: string; password: string }) {
    const { email, password } = values;
    const body = { email, password };

    // e.preventDefault();
    // const body = { email: email, password: password };
    // console.log("body",body);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}user/login`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => console.log("error", error));
    console.log("response final is :", response.code);
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
      });
      console.log(response.data);
      localStorage.setItem("mytoken", response.data.token);
      setTimeout(() => {
        window.location.href = "#/apiplans";
        window.location.reload();
      }, 600);
    }
    if (response.code == 400) {
      toast.error("Invalid Credentials, Try again!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    console.log("response", response);
  }

  return (
    <>
      <Box className="container-wrape">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={LoginUser}
            >
              {({
                isSubmitting 
              })=>(
                <Form>
                  <ToastContainer />
                  <h3>Login</h3>
                  <div className="mb-3">
                    <label>Email address</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      // value={email}
                      // onChange={(e: any) => setemail(e.target.value)}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      // value={password}
                      // onChange={(e: any) => setpassword(e.target.value)}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                  <p className="forgot-password text-right">
                    <a href="#">Forgot password?</a>
                  </p>
                  <br />
                  <p className="forgot-password text-right">
                    <span>Don't have an Acoount? </span>
                    <a href="/#/sign-up">Sign Up here</a>
                  </p>
                </Form>
              )}

            </Formik>
          
          </div>
        </div>
      </Box>
    </>
  );
};

export default Login;
