// function importAll(r) {
//   return r.keys().map(r);
// }
// export default importAll(require.context('../../img/', true));


const images = {

};

// function returnName(string) {
//   const arr = string.match(/[\w.$]+(?=png|jpg|gif)\w+/g);
//   const s = arr[0].split('.');
//   return s[0];
// }

function importAll(r) {
  r.keys().forEach(key => images[key] = r(key));
}

importAll(require.context('../../img/', true));

export default images;
