const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get a single pet
router.get("/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM pets");
    const pets = response.rows;
    res.json({ pets: pets });
  } catch (err) {
    console.log("Error:", err);
  }
});

// Get pet  by Id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.query(`SELECT * FROM pets WHERE id = ${id}`);
    const pet = response.rows[0];
    res.json({ pet: pet });
  } catch (err) {
    console.log("Error:", err);
  }
});
// Create pet
router.post("/", async (req, res) => {
  try {
    const postedpet = req.body;

    const response = await db.query(
      `INSERT INTO pets (name,age,type, breed, has_microchip)
      VALUES ('${postedpet.name}', '${postedpet.age}', '${postedpet.type}', '${postedpet.breed}', '${postedpet.has_microchip}')
      RETURNING *`
    );
    const pet = response.rows[0];
    res.status(201).json({ pet: pet });
  } catch (err) {
    console.log("Error:", err);
  }
});

//Upadte pet by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const postedpet = req.body;
    const response = await db.query(
      `UPDATE pets  SET (  name, age, type, breed, has_microchip) = ('${postedpet.name}', '${postedpet.age}', '${postedpet.type}','${postedpet.breed}', '${postedpet.has_microchip}')
      WHERE id = ${id}  RETURNING * `
    );
    const pet = response.rows[0];
    res.status(201).send({ pet: pet });
  } catch (err) {
    console.log("Error:", err);
  }
});

//Delete pet by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.query(`DELETE FROM pets WHERE id = ${id} RETURNING *`); 
    const pet = response.rows[0];
    res.status(201).send({ pet: pet });
  } catch (err) {
    console.log("Error:", err);
  }
});

module.exports = router;
