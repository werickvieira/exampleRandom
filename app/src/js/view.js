import isMobile from './modulos/checkMobileDevice';
// import { defineBucketURL } from './modulos/util';
import images from './modulos/exportImages';

// console.log('images', images);

let stopAnimation = false;
// const isArr = [];
const mobile = isMobile(700);
const queryItens = mobile ? '.g-block__item:not(.g-xs-hidden)' : '.g-block__item';
const allItens = document.querySelectorAll(queryItens);

const setHeightMobile = () => {
  const winH = window.innerHeight;
  const cliH = document.querySelector('.g-block').clientHeight;
  const minH = 190;
  const diff = winH - cliH;
  if (diff > 0) {
    [...allItens].forEach((item) => {
      const el = item;
      el.style.height = `${((diff / 2) + minH)}px`;
    });
  }
};

const getRange = () => {
  // const winW = window.innerWidth;
  const winW = document.querySelector('.g-intro').clientWidth;
  const itemW = allItens[0].clientWidth;
  // console.log('winW', winW);
  // console.log('itemW ', itemW);
  const range = Math.floor(winW / itemW);
  return range;
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
  console.log('range', range);
  const colors = ['yellow', 'lilac', 'blue', 'orange', 'green'];
  while (!isDiff) {
    const randomItem = itens[Math.floor((Math.random() * itens.length))];
    const randomColor = colors[Math.floor((Math.random() * colors.length))];
    const currColor = randomItem.getAttribute('color');
    // console.log('ITEM', randomItem)
    // console.log('COR DO ITEM', currColor);
    // console.log('Cor RANDOM', randomColor);
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
      // console.log('-------RANDOM NOVAMENTE-------');
      // console.log('______________________________');
    } else {
      // isArr.push(randomItem);
      isDiff = true;
      const svgRandom = Math.floor((Math.random() * 10) + 1);
      console.log('stopAnimation', stopAnimation);
      // const newImage = new Image();
      // newImage.onload = ({ target }) => {
      //   const { src } = target;
      //   setBackgroundImg(src, randomItem);
      //   // console.log('COR REALMENTE DEFINIDA', randomColor);
      //   // console.log('_________________________');
      // };
      // newImage.src = `${defineBucketURL(1)}/copa-cabeluda/img/
      // introducao/${randomColor}/${svgRandom}.svg`;
      randomItem.setAttribute('color', randomColor);
      const imgTarget = randomItem.querySelector('img');
      imgTarget.setAttribute('src', images[`./introducao/${randomColor}/${svgRandom}.svg`]);
    }
  }
};

// Funcao simplificada
// const randomBoxIntro = (itens) => {
//   let isDiff = false;
//   while (!isDiff) {
//     const randomItem = itens[Math.floor((Math.random() * itens.length))];
//     if (isArr.indexOf(randomItem) > -1) {
//       isDiff = false;
//     } else {
//       isArr.push(randomItem);
//       isDiff = true;
//       randomItem.classList.add('g-block__item--random');
//     }
//   }
// };

const controlRandomBoxIntro = () => {
  randomBoxIntro(allItens);
  // setTimeout(initIntro, 1000);
  window.requestAnimationFrame(initIntro);
};

const initIntro = () => {
  if (!stopAnimation) {
    console.log("exec!!!");
    setTimeout(controlRandomBoxIntro, 1000);
    // window.requestAnimationFrame(controlRandomBoxIntro);
  }
};

const initView = (data) => {
  initIntro();
  if (mobile) {
    setHeightMobile();
  }
  console.log('data', data[0]);
  // data.forEach((item) => {
  //  console.log("item", item);
  // });
};

export {
  initView as default,
};
