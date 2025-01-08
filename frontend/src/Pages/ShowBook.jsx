import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";

const ShowBook = () => {
  // `useState` is used to manage local state:
  // `book` holds the book data fetched from the API, and `loading` tracks the loading state.
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  // `useParams` retrieves the `id` parameter from the route.
  const { id } = useParams();

  // `useEffect` runs the provided function when the component renders or when dependencies change.
  // Here, it fetches book details when the component mounts or `id` changes.
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data.

    // `axios` performs an HTTP GET request to fetch details of a single book by `id`.
    axios
      .get(`http://localhost:7777/books/${id}`)
      .then((response) => {
        setBook(response.data); // Update `book` state with fetched data.
        setLoading(false); // Set loading to false after fetching is complete.
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging.
        setLoading(false); // Reset loading state in case of an error.
      });
  }, [id]); // Adding `id` as a dependency ensures the effect runs if `id` changes.

  return (
    <div className="p-4">
      {/* BackButton component allows navigation back to the previous page */}
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {/* Show Spinner while loading, otherwise display book details */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          {/* Display book details */}
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">ID</span>
            <span>{book.id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
