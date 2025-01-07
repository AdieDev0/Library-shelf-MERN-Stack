import express from "express";
import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";

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
    console.error(error.message);
    response.status(500).send({ message: "Internal server error" });
  }
});

// GET ALL THE BOOKS ROUTE
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal server error" });
  }
});

// GET ONE BOOK BY ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({ message: "Invalid Book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal server error" });
  }
});

// UPDATE BOOK
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author and publishYear",
      });
    }

    const { id } = request.params;

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({ message: "Invalid Book ID" });
    }

    const result = await Book.findByIdAndUpdate(id, request.body, { new: true });
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal server error" });
  }
});

// DELETE BOOK
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({ message: "Invalid Book ID" });
    }

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book not found." });
    }
    return response.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal server error" });
  }
});

export default router;
