// import isMobile from './modulos/checkMobileDevice';
// const setHeightMobile = () => {
//   const winH = window.innerHeight;
//   const cliH = document.querySelector('.g-block').clientHeight;
//   const itens = document.querySelectorAll(".g-block__item");
//   const minH = 190;

//   itens.forEach((item) => {
//     item.style.height = ( (winH - cliH) / 2 +  minH )+ 'px';
//   });
// };

const allItens = document.querySelectorAll('.g-block__item');
const isArr = [];

const randomBoxIntro = (itens) => {
  let isDiff = false;
  const range = 5; // De acordo com dispositivo
  const colors = ['yellow', 'lilac', 'blue', 'orange', 'green'];
  while (!isDiff) {
    const randomItem = itens[Math.floor((Math.random() * itens.length))];
    const randomColor = colors[Math.floor((Math.random() * colors.length))];
    const currColor = randomItem.getAttribute('color');
    const index = [...itens].indexOf(randomItem);
    const itemUp = itens[index - range];
    const itemDown = itens[index + range];
    const itemRight = itens[index + 1];
    const itemLeft = itens[index - 1];
    const mapSiblings = [itemUp, itemDown, itemRight, itemLeft].map(item => (
      item !== undefined ? item.getAttribute('color') : null
    ));

    if (currColor === randomColor
      || mapSiblings.indexOf(randomColor) > -1
      || isArr.indexOf(randomItem) > -1) {
      // continue;
      isDiff = false;
    } else {
      isArr.push(randomItem);
      isDiff = true;
      randomItem.setAttribute('color', randomColor);
    }
  }
};

const controlRandomBoxIntro = () => {
  randomBoxIntro(allItens);
  // setTimeout(initIntro, 1000);
  window.requestAnimationFrame(initIntro);
};

const initIntro = () => {
  if (isArr.length <= 4) {
    setTimeout(controlRandomBoxIntro, 3000);
    // window.requestAnimationFrame(controlRandomBoxIntro);
  }
};

const initView = (data) => {
  initIntro();
  // isMobile(800) ? setHeightMobile() : null;
  console.log('data', data[0]);
  // data.forEach((item) => {
  //  console.log("item", item);
  // });
};

export {
  initView as default,
};
