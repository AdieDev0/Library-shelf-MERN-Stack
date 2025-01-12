import React, { useState } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";
import { motion } from "framer-motion";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      key={book._id}
      className="relative border-2 border-gray-300 rounded-lg p-4 m-4 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="absolute top-2 right-4 px-4 py-1 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg">
        {book.publishYear}
      </h2>
      <h4 className="my-2 text-gray-600 font-medium">{book._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-red-500 text-2xl" />
        <h2 className="text-lg text-gray-800 font-semibold">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2 mt-2">
        <BiUserCircle className="text-red-500 text-2xl" />
        <h2 className="text-sm text-gray-600">{book.author}</h2>
      </div>
      <div className="flex justify-between items-center mt-4">
        <BiShow
          className="text-3xl text-blue-700 hover:text-blue-900 cursor-pointer transition-colors duration-300"
          onClick={() => setShowModal(true)}
        />
        <div className="flex gap-4">
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-2xl text-green-700 hover:text-green-900 cursor-pointer transition-colors duration-300" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-800 cursor-pointer transition-colors duration-300" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-800 cursor-pointer transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </motion.div>
  );
};

export default BookSingleCard;
