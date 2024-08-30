const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get a single book
router.get("/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM books");
    const books = response.rows;
    res.json({ books: books });
  } catch (err) {
    console.log("Error:", err);
  }
});

// Get book  by Id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.query(`SELECT * FROM books WHERE id = ${id}`);
    const book = response.rows[0];
    res.json({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

// Create book
router.post("/", async (req, res) => {
  try {
    const postedBook = req.body;

    const response = await db.query(
      `INSERT INTO books (title, type, author, topic, publication_date, pages)
      VALUES ('${postedBook.title}', '${postedBook.type}', '${postedBook.author}', '${postedBook.topic}', '${postedBook.publication_date}', ${postedBook.pages})
      RETURNING *`
    );
    const book = response.rows[0];
    res.status(201).json({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

//Upadte Book
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const postedBook = req.body;
    const response = await db.query(
      `UPDATE books  SET (title, type, author, topic, publication_date, pages) = ('${postedBook.title}', '${postedBook.type}', '${postedBook.author}', '${postedBook.topic}', '${postedBook.publication_date}', ${postedBook.pages})
      WHERE id = ${id}  RETURNING * `
    );
    const book = response.rows[0];
    res.status(201).send({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

//Delete Book by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.query(`DELETE FROM books WHERE id = ${id} RETURNING *`); 
    const book = response.rows[0];
    res.status(201).send({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

module.exports = router;
