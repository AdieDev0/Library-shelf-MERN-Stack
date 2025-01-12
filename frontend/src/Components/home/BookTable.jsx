import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BookTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">No</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 max-md:hidden">
              Author
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 max-md:hidden">
              Publish Year
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className={`border-t last:border-b hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{book.title}</td>
              <td className="px-4 py-2 text-sm text-gray-600 max-md:hidden">{book.author}</td>
              <td className="px-4 py-2 text-sm text-gray-600 max-md:hidden">
                {book.publishYear}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Link
                    to={`/books/details/${book._id}`}
                    className="text-green-500 hover:text-green-700 transition-colors"
                  >
                    <BsInfoCircle size={20} />
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors"
                  >
                    <AiOutlineEdit size={20} />
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => alert(`Delete book: ${book.title}`)}
                  >
                    <MdOutlineDelete size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
