
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('.study-buddy-477821-5207d4afcac2.json'); // Your service account key


async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet('Study Locations Data');
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  // Convert GoogleSpreadsheetRow → plain objects
  return rows.map(row => row.toObject());
}

// API endpoint for your HTML page
app.get('/sheet', async (req, res) => {
  const data = await accessSpreadsheet();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));