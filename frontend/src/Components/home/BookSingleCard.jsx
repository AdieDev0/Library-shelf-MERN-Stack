import React, { useState } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      key={book._id}
      className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {/* Publish Year */}
      <div className="absolute top-3 right-4 px-3 py-1 bg-red-100 text-red-500 text-sm font-semibold rounded-lg">
        {book.publishYear}
      </div>

      {/* Book Title */}
      <div className="flex items-center gap-2 text-gray-800">
        <PiBookOpenTextLight size={24} className="text-red-500" />
        <h2 className="font-medium text-lg truncate">{book.title}</h2>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2 text-gray-600">
        <BiUserCircle size={20} className="text-red-500" />
        <p className="text-sm truncate">{book.author}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 mt-auto">
        <BiShow
          size={28}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle size={22} className="text-green-600 hover:text-green-800" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit size={22} className="text-yellow-600 hover:text-yellow-800" />
        </Link>
        <button>
          <MdOutlineDelete size={22} className="text-red-600 hover:text-red-800" />
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <BookModal book={book} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookSingleCard;
