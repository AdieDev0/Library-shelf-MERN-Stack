import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:7777/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-semibold text-gray-800 my-6">
        Book Details
      </h1>

      {loading ? (
        <motion.div
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Spinner />
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col gap-6 bg-white shadow-lg rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { label: "ID", value: book.id },
            { label: "Title", value: book.title },
            { label: "Author", value: book.author },
            { label: "Publish Year", value: book.publishYear },
            {
              label: "Created Time",
              value: new Date(book.createdAt).toLocaleString(),
            },
            {
              label: "Last Update Time",
              value: new Date(book.updatedAt).toLocaleString(),
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-gray-700">
              <span className="font-medium">{label}</span>
              <span className="truncate">{value || "N/A"}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ShowBook;
