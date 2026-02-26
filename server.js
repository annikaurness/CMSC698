const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper function to read CSV
function readCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("studySpots.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

// Search route
app.post("/search", async (req, res) => {
  try {
    const filters = req.body;
    const spots = await readCSV();

    const filtered = spots.filter((spot) => {
      // Distance filters
      if (filters.walking && spot.walking !== "true") return false;
      if (filters.driving && spot.driving !== "true") return false;
      if (filters.onCampus && spot.onCampus !== "true") return false;

      // Focus level
      if (filters.focusLevel && spot.focusLevel !== filters.focusLevel)
        return false;

      // Indoor/Outdoor
      if (
        filters.locationType &&
        spot.locationType !== filters.locationType &&
        spot.locationType !== "both"
      )
        return false;

      return true;
    });

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Error reading CSV file" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});