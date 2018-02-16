import isMobile from './modulos/checkMobileDevice';
import images from './modulos/exportImages';
// import { defineBucketURL } from './modulos/util';

const elIntro = document.querySelector('.g-intro');
let stopAnimation = false;
// const isArr = [];
const mobile = isMobile(700)
const queryItens = mobile ? '.g-block__item:not(.g-xs-hidden)' : '.g-block__item';
const allItens = document.querySelectorAll(queryItens);

// const setHeightMobile = () => {
//   const winH = window.innerHeight;
//   const cliH = document.querySelector('.g-block').clientHeight;
//   const minH = 190;
//   const diff = winH - cliH;
//   if (diff > 0) {
//     [...allItens].forEach((item) => {
//       const el = item;
//       el.style.height = `${((diff / 2) + minH)}px`;
//     });
//   }
// };

const getRange = () => {
  const winW = elIntro.clientWidth;
  const itemW = allItens[0].clientWidth;
  return Math.ceil(winW / itemW);
};

// const setBackgroundImg = (arg, item) => {
//   // if (!arg) {
//   //   allItens.forEach((el) => {
//   //     const attr = el.getAttribute('data-img');
//   //     el.style.backgroundImage = `url(${attr})`;
//   //   });
//   // } else {
//   item.style.backgroundImage = `url(${arg})`;
//   // }
// };


const randomBoxIntro = (itens) => {
  let isDiff = false;
  const range = getRange();
  // console.log('range', range);
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
      || mapSiblings.indexOf(randomColor) > -1) {
      // || isArr.indexOf(randomItem) > -1
      // continue;
      isDiff = false;
    } else {
      // isArr.push(randomItem);
      isDiff = true;
      const svgRandom = Math.floor((Math.random() * 10) + 1);
      const newImage = new Image();
      newImage.onload = ({ target }) => {
        const { src } = target;
        // setBackgroundImg(src, randomItem);
        // console.log('COR REALMENTE DEFINIDA', randomColor);
        // console.log('_________________________');
        randomItem.querySelector('img').setAttribute('src', images[`./introducao/${randomColor}/${svgRandom}.svg`]);
      };
      // newImage.src = `${defineBucketURL(1)}/copa-cabeluda/img/introducao/${randomColor}/${svgRandom}.svg`;
      randomItem.setAttribute('color', randomColor);
      newImage.src = images[`./introducao/${randomColor}/${svgRandom}.svg`];
    }
  }
};

const controlRandomBoxIntro = () => {
  randomBoxIntro(allItens);
  // setTimeout(initIntro, 1000);
  window.requestAnimationFrame(initIntro);
};


const initIntro = () => {
  if (!stopAnimation) {
    setTimeout(controlRandomBoxIntro, 1000);
    //window.requestAnimationFrame(controlRandomBoxIntro);
  }
};

const funStopAnimation = () => {
  stopAnimation = !stopAnimation;
  // console.log('stopAnimation', stopAnimation)
  // window.cancelAnimationFrame(initIntro);
};

export {
  initIntro as default,
  funStopAnimation
};
