import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import CreateBooks from "./Components/CreateBooks";
import DeleteBook from "./Components/DeleteBook";
import ShowBook from "./Components/ShowBook";
import EditBook from "./Components/EditBook";
const App = () => {
  return;
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/books/create" element={<CreateBooks />} />
    <Route path="/books/delete/:id" element={<DeleteBook />} />
    <Route path="/books/details/:id" element={<ShowBook />} />
    <Route path="/books/edit/:id" element={<EditBook />} />
  </Routes>;
};

export default App;
