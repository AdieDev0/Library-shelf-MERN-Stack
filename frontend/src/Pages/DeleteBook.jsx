import { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); //notiStack
  const navigate = useNavigate();
  const { id } = useParams();

  // HandleDelete
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:7777/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/"); // Navigate to the home page after successful delete
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting the book. Please try again.", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton />
      <h1 className="text-3xl font-semibold my-4 text-gray-800">Delete Book</h1>
      {loading && (
        <div className="flex justify-center mt-6">
          <Spinner />
        </div>
      )}
      <div className="flex flex-col items-center border-2 border-red-500 bg-red-50 rounded-xl w-full max-w-lg p-8 mx-auto shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Are you sure you want to delete this book?</h3>
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleDeleteBook}
            className="py-3 px-6 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Yes, Delete it
          </button>
          <button
            onClick={() => navigate("/")}
            className="py-3 px-6 bg-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteBook;
