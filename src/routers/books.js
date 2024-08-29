const express = require('express')
const router = express.Router()
const db = require("../../db");

// Get a single book
router.get('/', async (req, res) => {
    try {
        const response = await client.query("SELECT * FROM books");
        const books = response.rows;
        res.json({ books: "books "});
      } catch (err) {
        console.log("Error:", err);
      }
})

// Get book  by Id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await client.query(
      `SELECT * FROM books WHERE id = ${id}`
    );
    const book = response.rows;
    res.json({ book: book[0]});
  } catch (err) {
    console.log("Error:", err);
  }
});

// Create book
router.post("/", async (req, res) => {
  try {
    const { title, type, author, topic, publication_date, pages } = req.body;
    const query = `
      INSERT INTO books (title, type, author, topic, publication_date, pages)
      VALUES ('life', 'fiction', 'akonde Durol', '  westerner',"2020-11-16", 109)
      RETURNING *;`;
    const response = await client.query(query, [
      title,
      type,
      author,
      topic,
      publication_date,
      pages,
    ]);
    const book = response.rows[0];
    res.status(201).json({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, type, author, topic, publication_date, pages } = req.body;
    const query = `
      UPDATE books

      SET title = "new  book",
          type = "adventure",
          author = "Hillary Trump",
          topic = "thriller",
          publication_date = "2020-11-16",
          pages = 419
      WHERE id = 1;`;
    const values = [title, type, author, topic, publication_date, pages, id];
    await client.query(query, values);

    const selectQuery = `SELECT * FROM books WHERE id = ${id};`;
    const selectResult = await client.query(selectQuery);
    const book = selectResult.rows[0];

    res.status(200).send({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const selectQuery = `SELECT * FROM books WHERE id = ${id};`;
    const selectResult = await client.query(selectQuery);
    const book = selectResult.rows[0];

    const query = `DELETE FROM books WHERE id = ${id};`;
    await client.query(query);
    res.status(200).send({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

module.exports = router
