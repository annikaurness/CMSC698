
// Assuming you have initialized the Google API client and authenticated
import { google } from 'googleapis';
import { readFileSync } from 'fs';
const keys = JSON.parse(readFileSync('./sbKeys.json', 'utf8'));
import express from 'express';
import { JSDOM } from "jsdom";
const app = express();

//type "node browse.js" in the terminal to connect
const client = new google.auth.JWT(
  keys.client_email,
  null, 
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){

  if(err){
      console.log(err);
      console.log('wiener :(')
      return;
  }else{
      console.log('Connected!');
      let spots =gsrun(client);
      displayItems(spots);
  }

});
  async function gsrun(cl){

  const gsapi = google.sheets({version: 'v4',auth:cl});
  const opt = {
      spreadsheetId: '1CTpUYJJzbvVK463Ozf0gL4ejmGPxdvL4ilh4YU9lDrA',
      range: 'Study_Spots!A1:G45'
  };

  let data = await gsapi.spreadsheets.values.get(opt);
  let dataArray = data.data.values;
  let newDataArray = dataArray.map(function(r){
  return r;
  });
  return newDataArray;
}


app.get('/data', async (req, res) => {
  const data = await gsrun(client);
  res.json(data);
});

function displayItems(items) {
  // Remove any existing entries from the table
  const dom = new JSDOM(`<!DOCTYPE html><table id="spots"></table>`);
  const document = dom.window.document;
  
  let tableBody = document.getElementById('spots');
  console.log(tableBody);

  // Add new rows for the items in the list
  let length = items.length;
  for(let n = 0;n < length;n++) {
    let newRow = document.createElement('tr');
		newRow.innerHTML = '<td class="align-middle">'+items[n][0]+'</td><td class="align-middle">$'+items[n][1]+'</td><td class="align-middle">$'+items[n][2]+'</td><td class="align-middle">$'
    +items[n][3]+'</td><td class="align-middle">$'+items[n][4]+'</td><td class="align-middle">$'+items[n][5]+'</td>';
    
  }
}
