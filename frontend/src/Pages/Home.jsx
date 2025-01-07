import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  // `useState` is used to manage the component's local state.
  // Here, `books` holds the fetched books data, and `loading` tracks the loading state.
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // `useEffect` runs the provided function after the component renders.
  // It is used here to fetch data when the component mounts.
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data.

    // `axios` is used to perform an HTTP GET request to fetch books data from the server.
    axios
      .get("http://localhost:7777/books")
      .then((response) => {
        // On success, update the `books` state with the fetched data.
        setBooks(response.data.data);
        setLoading(false); // Set loading to false once data is fetched.
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging.
        setLoading(false); // Ensure loading state is reset in case of an error.
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts.

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        {/* Link to navigate to the book creation page */}
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {/* Show spinner if data is loading, otherwise display the table */}
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {/* Use `books.map` to iterate over the `books` array and render rows */}
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    {/* Links to view, edit, and delete book details */}
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-800" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
