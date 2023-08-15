import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
function Register() {
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
  const navigate = useNavigate();
  const onSubmit = async data => {
    // data.preventDefault();
    const name = data.name;
    const email = data.email;
    const gender = data.gender;
    const password = data.password;

    await axios
      .post(
        "http://localhost:9000/user/register/",
        {
          name: name,
          email: email,
          gender: gender,
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
        navigate("/login");
      })
      .catch(err => {
        console.log("errors", err);
        alert(err.response.data.message);
      });
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <form
              method="post"
              name="RegistrationForm"
              className="flex-c form-width justify-content-md-center logform"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-3">
                <h2 className="mt-0 mb-5 hrm">Registration Form</h2>
              </div>
              <div className="form-group">
                <label className="lbel">Name</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  id="name"
                  {...register("name", {
                    minLength: 3,
                    required: "name is required",
                  })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                />
                {errors.name?.type === "required" && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
                {errors.name?.type === "minLength" && (
                  <small className="text-danger">
                    Name contains minimum 3 characters
                  </small>
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

              <div className="form-group">
                <label className="lbel">Email</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter email"
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
                <div>
                  <label>Gender</label>
                </div>

                <label htmlFor="male">
                  <input
                    {...register("gender")}
                    type="radio"
                    value="male"
                    id="male"
                  />
                  male
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="female">
                  <input
                    {...register("gender", { required: "gender is required" })}
                    type="radio"
                    value="female"
                    id="female"
                  />
                  female
                </label>
                {errors.gender && (
                  <small className="text-danger">{errors.gender.message}</small>
                )}
              </div>

              <div className="form-group mb-3">
                <button className="btn btn-primary form-control" type="submit">
                  Register
                </button>
              </div>
              <div className="form-group mb-3">
                <button
                  className="btn btn-primary form-control"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
