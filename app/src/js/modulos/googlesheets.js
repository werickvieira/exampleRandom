// import { converteDadosPlanilha } from './util';
// import { SheetsGoogle } from '../../../../config';

// const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// //const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

// function initClient(resolve, reject) {
//  gapi.client.init({
//    apiKey: SheetsGoogle['apiKey'],
//    discoveryDocs: DISCOVERY_DOCS
//  }).then(initSheets)
//    .then((e) => {
//      console.log("e", e)
//      resolve(converteDadosPlanilha(e));
//      reject(e);
//    });
// }

// function initSheets(){
// return gapi.client.sheets.spreadsheets.values.get({
//    spreadsheetId: SheetsGoogle['idPlanilha'] ,
//    range: SheetsGoogle['range'] , majorDimension: 'ROWS'
//  });
// }

// function loadCode(resolve, reject){
//  const body = document.querySelector("body");
//  const script = document.createElement("script");

//  script.setAttribute('type', 'text/javascript');
//  script.setAttribute('src', 'https://apis.google.com/js/api.js?v=4');
//  body.appendChild(script);

//  // Testar essa parte
//  // Pollyfill para o IE 10
//  // if (typeof(window.Promise) === "undefined"){
//  //  var s = document.createElement('script');
//  //  s.setAttribute('type', 'text/javascript');
//  //  s.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.5.0/bluebird.min.js');
//  //  document.getElementsByTagName('head')[0].appendChild(s);
//  //  window.Promise = P;
//  // };

//  script.onload = () => gapi.load('client:auth2', {
//    callback: function(){
//      initClient(resolve, reject);
//    }
//  });
// }


// export default new Promise(loadCode)
