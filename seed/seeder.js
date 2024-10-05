// seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../Models/User.js";
import Book from "../Models/Book.js";
import Transaction from "../Models/Transaction.js";
import bcrypt from "bcrypt";

dotenv.config();

const seed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for seeding");

    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    await Transaction.deleteMany({});
    console.log("Cleared existing Users, Books, and Transactions");

    // Insert Users
    const users = [
      {
        username: "alice",
        email: "alice@example.com",
        password: "password123",
        role: "member",
      },
      {
        username: "bob",
        email: "bob@example.com",
        password: "password123",
        role: "member",
      },
      {
        username: "charlie",
        email: "charlie@example.com",
        password: "password123",
        role: "admin",
      },
      {
        username: "diana",
        email: "diana@example.com",
        password: "password123",
        role: "member",
      },
      {
        username: "edward",
        email: "edward@example.com",
        password: "password123",
        role: "member",
      },
    ];

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, salt),
      }))
    );

    // Insert hashed users and capture inserted documents
    const insertedUsers = await User.insertMany(hashedUsers);
    console.log("Inserted Users");

    // Insert Books
    const books = [
      {
        name: "The Great Gatsby",
        category: "Fiction",
        rentPerDay: 2.5,
        author: "F. Scott Fitzgerald",
        publishedYear: 1925,
      },
      {
        name: "To Kill a Mockingbird",
        category: "Fiction",
        rentPerDay: 3,
        author: "Harper Lee",
        publishedYear: 1960,
      },
      {
        name: "1984",
        category: "Dystopian",
        rentPerDay: 2,
        author: "George Orwell",
        publishedYear: 1949,
      },
      {
        name: "A Brief History of Time",
        category: "Science",
        rentPerDay: 4,
        author: "Stephen Hawking",
        publishedYear: 1988,
      },
      {
        name: "The Art of Computer Programming",
        category: "Technology",
        rentPerDay: 5,
        author: "Donald Knuth",
        publishedYear: 1968,
      },
      {
        name: "The Catcher in the Rye",
        category: "Fiction",
        rentPerDay: 2.5,
        author: "J.D. Salinger",
        publishedYear: 1951,
      },
      {
        name: "Sapiens",
        category: "History",
        rentPerDay: 3.5,
        author: "Yuval Noah Harari",
        publishedYear: 2011,
      },
      {
        name: "The Lord of the Rings",
        category: "Fantasy",
        rentPerDay: 4.5,
        author: "J.R.R. Tolkien",
        publishedYear: 1954,
      },
      {
        name: "The Hobbit",
        category: "Fantasy",
        rentPerDay: 3.5,
        author: "J.R.R. Tolkien",
        publishedYear: 1937,
      },
      {
        name: "Clean Code",
        category: "Technology",
        rentPerDay: 4,
        author: "Robert C. Martin",
        publishedYear: 2008,
      },
      {
        name: "The Pragmatic Programmer",
        category: "Technology",
        rentPerDay: 4.5,
        author: "Andrew Hunt",
        publishedYear: 1999,
      },
      {
        name: "Harry Potter and the Sorcerer's Stone",
        category: "Fantasy",
        rentPerDay: 3,
        author: "J.K. Rowling",
        publishedYear: 1997,
      },
      {
        name: "The Alchemist",
        category: "Fiction",
        rentPerDay: 2.5,
        author: "Paulo Coelho",
        publishedYear: 1988,
      },
      {
        name: "The Lean Startup",
        category: "Business",
        rentPerDay: 3.5,
        author: "Eric Ries",
        publishedYear: 2011,
      },
      {
        name: "Thinking, Fast and Slow",
        category: "Psychology",
        rentPerDay: 3,
        author: "Daniel Kahneman",
        publishedYear: 2011,
      },
      {
        name: "Introduction to Algorithms",
        category: "Technology",
        rentPerDay: 5,
        author: "Thomas H. Cormen",
        publishedYear: 1990,
      },
      {
        name: "The Chronicles of Narnia",
        category: "Fantasy",
        rentPerDay: 3.5,
        author: "C.S. Lewis",
        publishedYear: 1950,
      },
      {
        name: "Pride and Prejudice",
        category: "Romance",
        rentPerDay: 2.5,
        author: "Jane Austen",
        publishedYear: 1813,
      },
      {
        name: "The Da Vinci Code",
        category: "Thriller",
        rentPerDay: 3,
        author: "Dan Brown",
        publishedYear: 2003,
      },
      {
        name: "Brave New World",
        category: "Dystopian",
        rentPerDay: 2,
        author: "Aldous Huxley",
        publishedYear: 1932,
      },
    ];

    // Insert books and capture inserted documents
    const insertedBooks = await Book.insertMany(books);
    console.log("Inserted Books");

    // Optionally, insert some transactions
    // Example: Alice issues "1984" on 2024-01-01
    const alice = insertedUsers.find((user) => user.username === "alice");
    if (!alice) {
      throw new Error('User "alice" not found in insertedUsers.');
    }

    const book1984 = insertedBooks.find((book) => book.name === "1984");
    if (!book1984) {
      throw new Error('Book "1984" not found in insertedBooks.');
    }

    const transaction = new Transaction({
      book: book1984._id,
      user: alice._id,
      issueDate: new Date("2024-01-01"),
      status: "issued",
    });

    await transaction.save();
    console.log("Inserted Transaction");

    // Update book availability
    book1984.available = false;
    await book1984.save();
    console.log("Updated Book Availability");

    // Close the connection
    await mongoose.connection.close();
    console.log("Seeding completed and connection closed");
  } catch (err) {
    console.error("Error seeding data:", err);
    // Exit the process with failure
    process.exit(1);
  }
};

// Execute the seed function
export default seed;
