import React, { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  // States for managing form inputs
  const [title, setTitle] = useState(""); // To store the book title
  const [author, setAuthor] = useState(""); // To store the author's name
  const [publishYear, setPublishYear] = useState(""); // To store the year of publication
  const [loading, setLoading] = useState(false); // To show the loading spinner during the save process
  const { enqueueSnackbar } = useSnackbar(); //notiStack
  const navigate = useNavigate(); // Used for navigation after successfully saving the book

  // Function to handle saving the book
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true); // Show spinner while the API call is in progress

    // Use axios to send a POST request to save the book
    axios
      .post(`http://localhost:7777/books`, data)
      .then(() => {
        setLoading(false); // Stop showing spinner once the request is successful
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/"); // Navigate to the home page
      })
      .catch((error) => {
        setLoading(false); // Stop showing spinner in case of an error
        // alert("An error happened. Please check the console."); // Notify the user about the error
        enqueueSnackbar("Error", { variant: "error" });
        console.error(error); // Log the error for debugging
      });
  };

  return (
    <div className="p-4">
      {/* BackButton component allows navigation back to the previous page */}
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {/* Show a loading spinner if `loading` is true */}
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Input field for the book title */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update state when user types
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {/* Input field for the book author */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} // Update state when user types
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {/* Input field for the publish year */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)} // Update state when user types
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {/* Button to save the book */}
        <button
          className="p-2 bg-sky-300 mt-8 hover:bg-sky-400 text-white font-semibold rounded"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
