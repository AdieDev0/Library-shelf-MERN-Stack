import React, { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  // States for managing form inputs
  const [title, setTitle] = useState(""); // To store the book title
  const [author, setAuthor] = useState(""); // To store the author's name
  const [publishYear, setPublishYear] = useState(""); // To store the year of publication
  const [loading, setLoading] = useState(false); // To show the loading spinner during API operations

  const { id } = useParams(); // Retrieve the book ID from the URL parameters
  const navigate = useNavigate(); // Used for navigation after successfully editing the book

  const { enqueueSnackbar } = useSnackbar(); //notiStack
  useEffect(() => {
    // Fetch existing book data when the component is mounted
    setLoading(true); // Start loading spinner
    axios
      .get(`http://localhost:7777/books/${id}`) // API call to fetch book details by ID
      .then((response) => {
        // Populate form fields with fetched data
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false); // Stop loading spinner
      })
      .catch((error) => {
        setLoading(false); // Stop loading spinner in case of an error
        alert("An error happened. Please check the console."); // Notify user about the error
        console.error(error); // Log the error for debugging
      });
  }, [id]); // The effect runs only once and when the `id` changes

  // Function to handle editing the book
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true); // Start loading spinner
    // Use axios to send a PUT request to update the book
    axios
      .put(`http://localhost:7777/books/${id}`, data)
      .then(() => {
        setLoading(false); // Stop loading spinner once the request is successful
        enqueueSnackbar("Book Edited Successfully", { varient: "success" });
        navigate("/"); // Navigate back to the home page
      })
      .catch((error) => {
        setLoading(false); // Stop loading spinner in case of an error
        // alert("An error happened. Please check the console."); // Notify user about the error
        enqueueSnackbar(error, { varient: "error" });
        console.error(error); // Log the error for debugging
      });
  };

  return (
    <div className="p-4">
      {/* BackButton component allows navigation back to the previous page */}
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
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
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
