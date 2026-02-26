const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

let studySpots = [];

// Load CSV once on startup
fs.createReadStream("StudySpots.csv")
  .pipe(csv())
  .on("data", (row) => {
    row["On/Off Campus"] = String(row["On/Off Campus"] || "")
      .trim()
      .toLowerCase();
  
    row["Indoor/Outdoor"] = String(row["Indoor/Outdoor"] || "")
      .trim()
      .toLowerCase();
  
    row["Distance from campus"] = String(row["Distance from campus"] || "")
      .trim()
      .toLowerCase();
  
    row["Focus Level"] = String(row["Focus Level"] || "")
      .trim();
  
    studySpots.push(row);
  })
  .on("end", () => {
    console.log("CSV loaded");
  });

  app.get("/search", (req, res) => {
    let results = [...studySpots];
  
    const { walking, driving, campus, focus, indoorOutdoor } = req.query;
  
    if (driving !== "true") {
      results = results.filter(spot =>
        spot["Distance from campus"] === "walking"
      );
    }
  
    if (driving === "true" && walking !== "true") {
      results = results.filter(spot =>
        spot["Distance from campus"] !== "walking"
      );
    }
  
    if (campus === "true") {
      results = results.filter(spot =>
        spot["On/Off Campus"] === "on"
      );
    }
  
    if (focus) {
      results = results.filter(spot =>
        spot["Focus Level"] === focus
      );
    }
  
    if (indoorOutdoor) {
      results = results.filter(spot =>
        spot["Indoor/Outdoor"] === indoorOutdoor.toLowerCase()
      );
    }
  
    res.json(results);
  });

  app.get("/spots", (req, res) => {
    res.json(studySpots);
  });
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});