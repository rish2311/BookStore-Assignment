// models/Book.js

import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
  author: { type: String },
  publishedYear: { type: Number },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
