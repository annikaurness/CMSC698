
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
  const campus = document.getElementById("inlineCheckbox3").checked;
  const focus = document.getElementById("focus-level").value;
  const indoorOutdoor = document.getElementById("in-out").value;

  const params = new URLSearchParams();

  if (walking) params.append("walking", "true");
  if (driving) params.append("driving", "true");
  if (campus) params.append("campus", "true");
  if (focus) params.append("focus", focus);
  if (indoorOutdoor) params.append("indoorOutdoor", indoorOutdoor);

  const response = await fetch(`http://localhost:3000/search?${params}`);
  const data = await response.json();

  const table = document.getElementById("csvTable");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  if (data.length === 0) {
      tbody.innerHTML = "<tr><td colspan='7'>No results found</td></tr>";
      return;
  }

  // Headers
  const headerRow = document.createElement("tr");
  Object.keys(data[0]).forEach(key => {
      const th = document.createElement("th");
      th.textContent = key;
      headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Rows
  data.forEach(row => {
      const tr = document.createElement("tr");

      Object.values(row).forEach(value => {
          const td = document.createElement("td");
          td.textContent = value;
          tr.appendChild(td);
      });

      tbody.appendChild(tr);
  });
});