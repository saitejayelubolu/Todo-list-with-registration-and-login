import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Todo() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [inprogress, setInprogress] = useState([]);
  const [inprogressStatus, setInprogressStatus] = useState(1);
  const [completed, setCompleted] = useState([]);
  const [completedStatus, setCompletedStatus] = useState(1);
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("user-info"));
  const token = userdetails.data.token;
  console.log(token);
  const logout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };
  const getAllTodo = async () => {
    axios
      .all([
        axios.get(`http://localhost:9000/todo/inprogresstodos`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }),
        axios.get(`http://localhost:9000/todo/completedtodos`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }),
      ])
      .then(
        axios.spread((inprogress, completed) => {
          console.log("res inprogress", inprogress.data);
          console.log("res completed", completed.data);
          if (inprogress.data.status == false) {
            setInprogressStatus(0);
          } else {
            setInprogress(inprogress.data.data);
          }
          if (completed.data.status == false) {
            setCompletedStatus(0);
          } else {
            setCompleted(completed.data.data);
          }
        })
      )
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getAllTodo();
  }, []);

  function deleteTodo(id) {
    console.log("id", id);
    axios
      .delete("http://localhost:9000/todo/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then(result => {
        console.log("delete", result);
        alert("Deleted successfully");
        window.location.reload(false);
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  return (
    <>
      <div className="container">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-danger" onClick={() => logout()}>
            Log out
          </button>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/create")}>
          Create
        </button>
        <div class="row justify-content-around">
          <div class="col-4">
            <div>
              <h1>In progress</h1>
              {inprogressStatus ? (
                inprogress.map(todo => (
                  <div className="card mb-3">
                    <span>{todo.title}</span>
                    <br></br>
                    <span>{todo.description}</span>
                    <br></br>
                    <span>{todo.date}</span>
                    <br></br>
                    <span>{todo.status}</span>
                    <br></br>
                    <Link
                      className="btn btn-sm btn-success mb-2"
                      to={`/update/${todo._id}`}
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <span>No Records inprogress</span>
              )}
            </div>
          </div>
          <div class="col-4">
            <div>
              <h1>Completed</h1>
              {completedStatus ? (
                completed.map(todo => (
                  <div className="card mb-3">
                    <span>{todo.title}</span>
                    <br></br>
                    <span>{todo.description}</span>
                    <br></br>
                    <span>{todo.date}</span>
                    <br></br>
                    <span>{todo.status}</span>
                    <br></br>
                    <Link
                      className="btn btn-sm btn-success mb-3"
                      to={`/update/${todo._id}`}
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-success "
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <span>No Records Completed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
