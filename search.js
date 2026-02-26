
// import { google } from 'googleapis';
// import { readFileSync } from 'fs';
// const keys = JSON.parse(readFileSync('./sbKeys.json', 'utf8'));
// import express from 'express';
// import { JSDOM } from "jsdom";
// const app = express();

// //type "node browse.js" in the terminal to connect
// const client = new google.auth.JWT(
//   keys.client_email,
//   null, 
//   keys.private_key,
//   ['https://www.googleapis.com/auth/spreadsheets']
// );

// client.authorize(function(err,tokens){

//   if(err){
//       console.log(err);
//       console.log('wiener :(')
//       return;
//   }else{
//       console.log('Connected!');
//       let spots =gsrun(client);
//       displayItems(spots);
//   }

// });
//   async function gsrun(cl){

//   const gsapi = google.sheets({version: 'v4',auth:cl});
//   const opt = {
//       spreadsheetId: '1CTpUYJJzbvVK463Ozf0gL4ejmGPxdvL4ilh4YU9lDrA',
//       range: 'Study_Spots!A1:G45'
//   };

//   let data = await gsapi.spreadsheets.values.get(opt);
//   let dataArray = data.data.values;
//   let newDataArray = dataArray.map(function(r){
//   return r;
//   });
//   return newDataArray;
// }


// app.get('/data', async (req, res) => {
//   const data = await gsrun(client);
//   res.json(data);
// });

// function displayItems(items) {
//   // Remove any existing entries from the table
//   const dom = new JSDOM(`<!DOCTYPE html><table id="spots"></table>`);
//   const document = dom.window.document;
  
//   let tableBody = document.getElementById('spots');
//   console.log(tableBody);

//   // Add new rows for the items in the list
//   let length = items.length;
//   for(let n = 0;n < length;n++) {
//     let newRow = document.createElement('tr');
// 		newRow.innerHTML = '<td class="align-middle">'+items[n][0]+'</td><td class="align-middle">$'+items[n][1]+'</td><td class="align-middle">$'+items[n][2]+'</td><td class="align-middle">$'
//     +items[n][3]+'</td><td class="align-middle">$'+items[n][4]+'</td><td class="align-middle">$'+items[n][5]+'</td>';
    
//   }
// }
document.getElementById("go").addEventListener("click", async () => {
  const walking = document.getElementById("inlineCheckbox1").checked;
  const driving = document.getElementById("inlineCheckbox2").checked;
  const onCampus = document.getElementById("inlineCheckbox3").checked;
  const focusLevel = document.getElementById("focus-level").value;
  const locationType = document.getElementById("in-out").value;

  const response = await fetch("http://localhost:8000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walking,
      driving,
      onCampus,
      focusLevel,
      locationType,
    }),
  });

  const data = await response.json();
  console.log(data);

  // You can now display results on the page
});