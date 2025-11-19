// Assuming you have initialized the Google API client and authenticated
const { google } = require('googleapis');
const keys = require('./sbKeys.json');
const spreadsheetId = '1CTpUYJJzbvVK463Ozf0gL4ejmGPxdvL4ilh4YU9lDrA';
const range = 'Study_Spots!A1:G44'; 


const client = new google.auth.JWT(
  keys.client_email,
  null, 
  keys.private_key, 
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){

  if(err){
      console.log(err);
      return;
  }else{
      console.log('Connected!');
      gsrun(client);
  }

});
async function gsrun(cl){

  const gsapi = google.sheets({version: 'v4',auth:cl});
  const opt = {
      spreadsheetId: '1CTpUYJJzbvVK463Ozf0gL4ejmGPxdvL4ilh4YU9lDrA',
      range: 'Study_Spots!A2:D14'
  };

  let data = await gsapi.spreadsheets.values.get(opt);
  let dataArray = data.data.values;
  let newDataArray = dataArray.map(function(r){
  r.push(r[0]+' my code works');
  return r;
  });
  console.log(newDataArray);
}