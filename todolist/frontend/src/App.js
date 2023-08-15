import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useParams,
} from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";
import AllTodos from "./Components/Todo";
import CreateTodo from "./Components/CreateTodo";
import UpdateTodo from "./Components/UpdateTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<AllTodos />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/update/:id" element={<UpdateTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
