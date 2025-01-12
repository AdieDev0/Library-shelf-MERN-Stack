import React from "react";
import { motion } from "framer-motion";
import BookSingleCard from "./BookSingleCard";

const BookCard = ({ books }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {books.map((item) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <BookSingleCard book={item} />
        </motion.div>
      ))}
    </div>
  );
};

export default BookCard;
