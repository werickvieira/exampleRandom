import isMobile from './modulos/checkMobileDevice';

// const k = require.context('../img/introducao/', true, /^\.\/.*\.svg/);

const isArr = [];
const mobile = isMobile(700);
const queryItens = mobile ? '.g-block__item:not(.g-xs-hidden)' : '.g-block__item';
const allItens = document.querySelectorAll(queryItens);

const setHeightMobile = () => {
  const winH = window.innerHeight;
  const cliH = document.querySelector('.g-block').clientHeight;
  const minH = 190;
  const diff = winH - cliH;
  if (diff > 0) {
    allItens.forEach((item) => {
      const el = item;
      el.style.height = `${((diff / 2) + minH)}px`;
    });
  }
};

const setBackgroundImg = (arg, item) => {
  if (!arg) {
    allItens.forEach((el) => {
      const attr = el.getAttribute('data-img');
      el.style.backgroundImage = `url(${attr})`;
    });
  } else {
    item.style.backgroundImage = `url(${arg})`;
  }
};

const randomBoxIntro = (itens) => {
  let isDiff = false;
  const range = mobile ? 2 : 5;
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
      const imgURL = `img/introducao/${randomColor}/${Math.floor((Math.random() * 10) + 1)}.svg`;
      setBackgroundImg(imgURL, randomItem);
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
