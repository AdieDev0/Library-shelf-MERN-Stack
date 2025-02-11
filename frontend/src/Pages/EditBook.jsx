import React, { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState(""); 
  const [author, setAuthor] = useState(""); 
  const [publishYear, setPublishYear] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const { id } = useParams(); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:7777/books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to fetch book details. Please try again.", {
          variant: "error",
        });
        console.error(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };

    setLoading(true);
    axios
      .put(`http://localhost:7777/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to update book. Please try again.", {
          variant: "error",
        });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Book</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter book title"
            />
          </div>

          {/* Author Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter author name"
            />
          </div>

          {/* Publish Year Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publish Year
            </label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter year of publication"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleEditBook}
            className="w-full bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
