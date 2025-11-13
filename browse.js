// Assuming you have initialized the Google API client and authenticated

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('.study-buddy-477821-5207d4afcac2.json');
const spreadsheetId = '1CTpUYJJzbvVK463Ozf0gL4ejmGPxdvL4ilh4YU9lDrA';
const range = 'Study_Spots!A1:G44'; 

gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheetId,
  range: range
}).then(function(response) {
  const values = response.result.values;
  if (values && values.length > 0) {
    console.log('Data fetched successfully:');
    values.forEach(function(row) {
      console.log(row.join(', ')); // Display each row
    });
  } else {
    console.log('No data found.');
  }
}, function(reason) {
  console.error('Error fetching data: ' + reason.result.error.message);
});