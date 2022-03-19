const { prototype } = require("events");
const express = require("express");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const path = require("path");
const { title } = require("process");
const util = require("util");
const { v4 } = require("uuid");
const { db } = require("./db/db.json");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
PORT = 3001;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  const note = {
    title,
    text,
    id: v4(),
  };
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const notes = JSON.parse(data);
    notes.push(note);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      err
        ? console.error(err)
        : console.info(`\nData written to './db/db.json'`);
      res.json(note);
      console.log(note);
    });
  });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
