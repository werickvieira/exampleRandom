// function importAll(r) {
//   return r.keys().map(r);
// }
// export default importAll(require.context('../../img/', true));

const images = {

};

function importAll(r) {
  r.keys().forEach((key) => { images[key] = r(key); });
}

importAll(require.context('../../img/', true));

export default images;
