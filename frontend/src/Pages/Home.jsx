import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import axios from "axios";
import Spinner from "../Components/Spinner";
import BookCard from "../Components/home/BookCard";
import BookTable from "../Components/home/BookTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:7777/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      {/* Toggle View Buttons */}
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
            showType === "table"
              ? "bg-sky-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setShowType("table")}
        >
          Table View
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
            showType === "card"
              ? "bg-sky-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setShowType("card")}
        >
          Card View
        </button>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Books List</h1>
        <Link
          to="/books/create"
          className="text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-2 text-lg font-medium"
        >
          <MdOutlineAddBox size={28} />
          Add Book
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spinner />
        </div>
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default Home;
