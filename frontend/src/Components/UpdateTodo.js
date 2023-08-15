import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function UpdateTodo() {
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("user-info"));
  const token = userdetails.data.token;
  console.log(token);
  const [dataa, setDataa] = useState({});

  const params = useParams();
  useEffect(() => {
    console.log("id", params.id);
    axios
      .get("http://localhost:9000/todo/" + params.id, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then(result => {
        // console.log("useeffect: ", result.data.data.title);
        setDataa(result.data.data);
        reset(result.data.data);
      })
      .catch(err => {
        console.log("errors", err);
      });
  }, []);

  // const title2 = JSON.stringify(title1);
  const preLoadValues = {
    title: dataa.title,
    description: dataa.description,
    status: dataa.status,
  };

  console.log("dataValues:", preLoadValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    getValues,
    setValue,
  } = useForm({ defaultValues: preLoadValues });

  const onSubmit = async data => {
    // data.preventDefault();
    const title = data.title;
    const description = data.description;
    const status = data.status;
    await axios
      .put(
        "http://localhost:9000/todo/" + params.id,
        {
          title: title,
          description: description,
          status: status,
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
          <div className="row d-flex justify-content-center">
            <form
              method="post"
              name="RegistrationForm"
              className="flex-c form-width justify-content-md-center logform"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-3">
                <h2 className="mt-0 mb-5 hrm">Update Todo</h2>
              </div>
              <div className="form-group">
                <label className="lbel">Title</label>
                <input
                  className="form-control p-0"
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  id="title"
                  {...register("title")}
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
              <div className="form-group">
                <label className="lbel">Status</label>
                <select
                  name="status"
                  id="status"
                  {...register("status")}
                  onKeyUp={() => {
                    trigger("status ");
                  }}
                >
                  <option value="inprogress">Inprogress</option>
                  <option value="completed">Completed</option>
                </select>
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

export default UpdateTodo;
