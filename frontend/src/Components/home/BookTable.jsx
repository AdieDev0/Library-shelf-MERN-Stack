import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { motion } from "framer-motion";

const BookTable = ({ books }) => {
  return (
    <motion.table
      className="w-full border-separate border-spacing-0 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <thead className="bg-gradient-to-r from-teal-400 to-teal-500 text-white">
        <tr>
          <th className="py-3 px-4 text-left text-sm font-semibold">No</th>
          <th className="py-3 px-4 text-left text-sm font-semibold">Title</th>
          <th className="py-3 px-4 text-left text-sm font-semibold max-md:hidden">Author</th>
          <th className="py-3 px-4 text-left text-sm font-semibold max-md:hidden">Publish Year</th>
          <th className="py-3 px-4 text-left text-sm font-semibold">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <motion.tr
            key={book._id}
            className={`h-16 transition-all duration-300 ease-in-out rounded-md ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } shadow-sm hover:shadow-lg`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <td className="py-4 px-6 text-center text-gray-600 font-medium">{index + 1}</td>
            <td className="py-4 px-6 text-center text-gray-700">{book.title}</td>
            <td className="py-4 px-6 text-center text-gray-600 max-md:hidden">{book.author}</td>
            <td className="py-4 px-6 text-center text-gray-600 max-md:hidden">{book.publishYear}</td>
            <td className="py-4 px-6 text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl text-teal-600 hover:text-teal-800 transition duration-200 ease-in-out"
                  >
                    <BsInfoCircle />
                  </motion.div>
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl text-yellow-600 hover:text-yellow-800 transition duration-200 ease-in-out"
                  >
                    <AiOutlineEdit />
                  </motion.div>
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                  >
                    <MdOutlineDelete />
                  </motion.div>
                </Link>
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  );
};

export default BookTable;
