import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/todo");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    getValues,
    setValue,
  } = useForm({});

  const onSubmit = async data => {
    // data.preventDefault();
    const email = data.email;
    const password = data.password;

    await axios
      .post(
        "http://localhost:9000/user/login/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(result => {
        console.log("res", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/todo");
      })
      .catch(err => {
        const errorMessage = err.response.data.message;
        alert(errorMessage);
        console.log("errors", err.response.data.message);
      });
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <form
              method="post"
              name="userRegistrationForm"
              className="flex-c form-width justify-content-md-center logform"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-3">
                <h2 className="mt-0 mb-5 hrm">Login </h2>
              </div>
              <div className="form-group">
                <label className="lbel">Email</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    validate: {
                      maxLength: v =>
                        v.length <= 50 ||
                        "The email should have at most 50 characters",
                      matchPattern: v =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "Email address must be a valid address",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
                {errors.email?.message && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="lbel">Password</label>
                <input
                  className="form-control p-0"
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  {...register("password", {
                    minLength: 6,
                    required: "password is required",
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
                {errors.password?.type === "required" && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
                {errors.password?.type === "minLength" && (
                  <small className="text-danger">
                    Password contains minimum 6 characters
                  </small>
                )}
              </div>
              <div className="form-group mb-3">
                <button className="btn btn-primary form-control" type="submit">
                  Login
                </button>
              </div>
              <div className="form-group mb-3">
                <button
                  className="btn btn-primary form-control"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
