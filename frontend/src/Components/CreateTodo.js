import React, { useRef, useState, useEffect, useAuth } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
function CreateTodo() {
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("user-info"));
  const token = userdetails.data.token;
  console.log(token);
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
    const title = data.title;
    const description = data.description;
    await axios
      .post(
        "http://localhost:9000/todo/todo/",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(result => {
        console.log("res", result);
        navigate("/todo");
      })
      .catch(err => {
        console.log("errors", err);
        alert(err.response.data.message);
        window.location.reload(false);
      });
  };
  const logout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/todo")}
            >
              Todo List
            </button>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-danger" onClick={() => logout()}>
              Log out
            </button>
          </div>

          <div className="row justify-content-center">
            <form
              method="post"
              name="RegistrationForm"
              className="justify-content-md-center card mt-5 w-75"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-3">
                <h2 className="mt-0 mb-5 hrm">Create Todo</h2>
              </div>
              <div className="form-group">
                <label className="lbel">Title</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  onKeyUp={() => {
                    trigger("title");
                  }}
                />
                {errors.title && (
                  <small className="text-danger">{errors.title.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="lbel">Description</label>
                <textarea
                  className="form-control p-0"
                  placeholder="Description"
                  name="description"
                  id="description"
                  {...register("description")}
                  onKeyUp={() => {
                    trigger("description");
                  }}
                ></textarea>
              </div>

              <div className="form-group mb-3">
                <button className="btn btn-primary form-control" type="submit">
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTodo;
