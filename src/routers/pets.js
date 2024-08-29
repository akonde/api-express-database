const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get a single book
router.get("/", async (req, res) => {
  try {
    const response = await client.query("SELECT * FROM pets");
    const pets = response.rows;
    res.json({ pets: "pets " });
  } catch (err) {
    console.log("Error:", err);
  }
});

// Get book  by Id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await client.query(`SELECT * FROM pets WHERE id = ${id}`);
    const pet = response.rows;
    res.json({ book: book[0] });
  } catch (err) {
    console.log("Error:", err);
  }
});

// Create book

router.post("/", async (req, res) => {
  try {
    const { title, type, author, topic, publication_date, pages } = req.body;
    const query = `
      INSERT INTO pets (name, age, type, breed, has_microchip)
      VALUES ("shally", 6,"Dog", "Glen of Imaal Terrier",true)
      RETURNING *;`;
    const response = await client.query(query, [
      name,
      age,
      type,
      breed,
      has_microchip,
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
    const { name, age, type, breed, has_microchip } = req.body;
    const query = `
      UPDATE pets

      SET name = "bally", 
      age =  3,
      type = Dog, 
      breed = Glen of Imaal Terrie, 
      has_microchip = true,
      WHERE id = 2;`;
    const values = [name, age, type, breed, has_microchip];
    await client.query(query, values);

    const selectQuery = `SELECT * FROM pets WHERE id = ${id};`;
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
    const selectQuery = `SELECT * FROM pets WHERE id = ${id};`;
    const selectResult = await client.query(selectQuery);
    const book = selectResult.rows[0];

    const query = `DELETE FROM pets WHERE id = ${id};`;
    await client.query(query);
    res.status(200).send({ book: book });
  } catch (err) {
    console.log("Error:", err);
  }
});

module.exports = router;
