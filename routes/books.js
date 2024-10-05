// routes/books.js

import express from "express";
import Book from "../Models/Book.js"; // Corrected the import path to lowercase 'models'

const router = express.Router();

/**
 * @route   GET /api/books
 * @desc    Get books based on query parameters or retrieve all books
 * @query   name (string), rentMin (number), rentMax (number), category (string)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const { name, rentMin, rentMax, category } = req.query;

    // Build the query object
    let query = {};

    if (name) {
      // Case-insensitive regex search for name term
      query.name = { $regex: name, $options: "i" };
    }

    if (rentMin || rentMax) {
      query.rentPerDay = {};
      if (rentMin) {
        const rentMinFloat = parseFloat(rentMin);
        if (isNaN(rentMinFloat)) {
          return res.status(400).json({ message: "Invalid rentMin value." });
        }
        query.rentPerDay.$gte = rentMinFloat;
      }
      if (rentMax) {
        const rentMaxFloat = parseFloat(rentMax);
        if (isNaN(rentMaxFloat)) {
          return res.status(400).json({ message: "Invalid rentMax value." });
        }
        query.rentPerDay.$lte = rentMaxFloat;
      }
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Fetch books based on the query
    const books = await Book.find(query);

    // Prepare the response
    const response = {
      totalBooks: books.length,
      books: books.map((book) => ({
        id: book._id,
        name: book.name,
        category: book.category,
        rentPerDay: book.rentPerDay,
        author: book.author,
        publishedYear: book.publishedYear,
        available: book.available,
        createdAt: book.createdAt,
      })),
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
