import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[450px] bg-white rounded-xl p-6 flex flex-col relative shadow-lg"
      >
        {/* Close Button */}
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        
        {/* Book Year */}
        <h2 className="w-fit px-4 py-1 bg-red-300 text-white rounded-lg mb-2">
          {book.publishYear}
        </h2>
        
        {/* Book ID */}
        <h4 className="my-2 text-gray-500">{book._id}</h4>

        {/* Book Title */}
        <div className="flex items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1 font-semibold text-lg">{book.title}</h2>
        </div>

        {/* Author */}
        <div className="flex items-center gap-x-2 mt-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1 text-lg">{book.author}</h2>
        </div>

        {/* Book Description */}
        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          tenetur iste incidunt cum necessitatibus suscipit ut architecto
          itaque. Delectus dignissimos ex ipsum ut molestias doloremque deserunt
          eaque culpa hic sed.
        </p>

        {/* Modal Footer */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
