const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

let studySpots = [];

// Load CSV once on startup
fs.createReadStream("study_spots.csv")
  .pipe(csv())
  .on("data", (row) => {
    // Convert distance + focus to usable types
    row["Distance from campus"] = parseFloat(row["Distance from campus"]);
    row["Focus Level"] = parseInt(row["Focus Level"]);
    studySpots.push(row);
  })
  .on("end", () => {
    console.log("CSV loaded");
  });

app.get("/search", (req, res) => {
  let results = [...studySpots];

  const {
    walking,
    driving,
    campus,
    focus,
    indoorOutdoor
  } = req.query;

  // Walking = under 1 mile
  if (walking === "true") {
    results = results.filter(spot => 
      spot["Distance from campus"] < 1
    );
  }

  // Driving = 1 mile or more
  if (driving === "true") {
    results = results.filter(spot => 
      spot["Distance from campus"] >= 1
    );
  }

  // On Campus filter
  if (campus === "true") {
    results = results.filter(spot =>
      spot["On/Off Campus"].toLowerCase() === "on"
    );
  }

  // Focus level
  if (focus) {
    results = results.filter(spot =>
      spot["Focus Level"] === parseInt(focus)
    );
  }

  // Indoor/Outdoor
  if (indoorOutdoor) {
    results = results.filter(spot =>
      spot["Indoor/Outdoor"].toLowerCase() === indoorOutdoor.toLowerCase()
    );
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});