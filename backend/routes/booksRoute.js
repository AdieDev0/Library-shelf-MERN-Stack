import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route for saving a new book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const savedBook = new Book(newBook);
    await savedBook.save();
    return response.status(201).send({ message: "Book saved successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET ALL THE BOOKS ROUTE
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      // ADDED DATA LOOKS FORMAT LIKE 1,2,3,4
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET ONE BOOK BY ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// UPDATEE BOOK
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author and publish year",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book Update Sucessfully!" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// DELETE BOOK
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book Not Found." });
    }
    return response.status(200).send({ message: "Book Deleted SuccessFully!" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});
