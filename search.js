
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('.study-buddy-477821-5207d4afcac2.json'); // Your service account key

async function accessSpreadsheet() {
const doc = new GoogleSpreadsheet('Study Locations Data');
    await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or by name: doc.sheetsByTitle['Sheet1']
    const rows = await sheet.getRows();
    console.log(rows);
}
accessSpreadsheet();