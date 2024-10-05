import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import booksRoute from "./routes/books.js";
import transactionsRoute from "./routes/transactions.js";
import UserRoute from "./routes/user.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/books", booksRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/user", UserRoute);

// Demo
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Server is working fine",
    guide: {
      API: {
        base_url: "https://bookstore-hazel-three.vercel.app/api",
        endpoints: [
          {
            method: "GET",
            path: "/books",
            description: "Retrieve a list of books.",
            queryParameters: {
              limit: {
                type: "integer",
                required: false,
                description: "Maximum number of books to return.",
              },
              page: {
                type: "integer",
                required: false,
                description: "Page number for pagination.",
              },
            },
            responses: {
              200: {
                description: "A list of books.",
                example: [
                  {
                    id: "123",
                    title: "Book Title",
                    author: "Author Name",
                    publishedDate: "2023-01-01",
                  },
                ],
              },
              500: {
                description: "Internal Server Error",
                example: {
                  error: "Error message details",
                },
              },
            },
          },
          {
            method: "GET",
            path: "/books/:id",
            description: "Retrieve a single book by its ID.",
            queryParameters: {},
            responses: {
              200: {
                description: "Details of the book.",
                example: {
                  id: "123",
                  title: "Book Title",
                  author: "Author Name",
                  publishedDate: "2023-01-01",
                },
              },
              404: {
                description: "Book not found.",
                example: {
                  error: "Book with the specified ID does not exist.",
                },
              },
              500: {
                description: "Internal Server Error",
                example: {
                  error: "Error message details",
                },
              },
            },
          },
          {
            method: "POST",
            path: "/books",
            description: "Create a new book.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  example: {
                    title: "New Book Title",
                    author: "New Author Name",
                    publishedDate: "2024-01-01",
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Book created successfully.",
                example: {
                  id: "123",
                  title: "New Book Title",
                  author: "New Author Name",
                  publishedDate: "2024-01-01",
                },
              },
              400: {
                description: "Invalid request body.",
                example: {
                  error: "Request body is missing required fields.",
                },
              },
              500: {
                description: "Internal Server Error",
                example: {
                  error: "Error message details",
                },
              },
            },
          },
          {
            method: "PUT",
            path: "/books/:id",
            description: "Update an existing book by its ID.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  example: {
                    title: "Updated Book Title",
                    author: "Updated Author Name",
                    publishedDate: "2024-01-02",
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Book updated successfully.",
                example: {
                  id: "123",
                  title: "Updated Book Title",
                  author: "Updated Author Name",
                  publishedDate: "2024-01-02",
                },
              },
              404: {
                description: "Book not found.",
                example: {
                  error: "Book with the specified ID does not exist.",
                },
              },
              400: {
                description: "Invalid request body.",
                example: {
                  error: "Request body is missing required fields.",
                },
              },
              500: {
                description: "Internal Server Error",
                example: {
                  error: "Error message details",
                },
              },
            },
          },
          {
            method: "DELETE",
            path: "/books/:id",
            description: "Delete a book by its ID.",
            queryParameters: {},
            responses: {
              204: {
                description: "Book deleted successfully.",
              },
              404: {
                description: "Book not found.",
                example: {
                  error: "Book with the specified ID does not exist.",
                },
              },
              500: {
                description: "Internal Server Error",
                example: {
                  error: "Error message details",
                },
              },
            },
          },
          {
            method: "POST",
            path: "/transactions",
            description: "Create a new transaction.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  example: {
                    bookId: "123",
                    userId: "456",
                    transactionType: "borrow",
                    transactionDate: "2024-10-05",
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Transaction created successfully.",
                example: {
                  id: "789",
                  bookId: "123",
                  userId: "456",
                  transactionType: "borrow",
                  transactionDate: "2024-10-05",
                },
              },
              400: {
                description: "Invalid request body.",
                example: {
                  error: "Request body is missing required fields.",
                },
              },
              500: {
                description: "Internal Server Error",
                example: {
                  error: "Error message details",
                },
              },
            },
          },
        ],
      },
    },
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
