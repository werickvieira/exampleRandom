import isMobile from './modulos/checkMobileDevice';
// import images from './modulos/exportImages';

const main = document.querySelector('#infoarte');
const allItens = document.querySelectorAll('.g-block__item');
const mobile = isMobile(700)
let stopAnimation = false;

const getRange = () => {
  const winW = main.clientWidth;
  const itemW = allItens[0].clientWidth;
  return Math.floor(winW / itemW);
};

/*
  Lógica aplicada:
  O container (#infoarte), deverá conter 100% da largura de qualquer device,
  qualquer elemento que ultrapasse a altura do container, deverá receber o attributo hidden;
*/
const hiddenElementsIntro = () => {
  const winH = main.clientHeight;
  [...allItens].forEach((item) => {
    const offsetTop = item.offsetTop;
    if (offsetTop > winH) {
      item.setAttribute('hidden', '');
    } 
  })
};

const randomBoxIntro = (itens) => {
  let isDiff = false;
  const range = getRange();
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
      isDiff = false;
    } else {
      isDiff = true;
      randomItem.setAttribute('color', randomColor);
      const svgRandom = Math.floor((Math.random() * 10) + 1);
      const newImage = new Image();
      newImage.onload = ({ target }) => {
        const { src } = target;
        randomItem.querySelector('img').setAttribute('src', `${API_URL}img/introducao/${randomColor}/${svgRandom}.svg`);
      };
      newImage.src = `${API_URL}img/introducao/${randomColor}/${svgRandom}.svg`;
      // randomItem.setAttribute('color', randomColor);
    }
  }
};

const controlRandomBoxIntro = () => {
  const elements = document.querySelectorAll('.g-block__item:not([hidden])');
  randomBoxIntro(elements);
  window.requestAnimationFrame(initIntro);
};


const initIntro = () => {
  if (!stopAnimation) {
    setTimeout(controlRandomBoxIntro, 800);
  }
};


const funStopAnimation = () => {
  stopAnimation = !stopAnimation;
  window.cancelAnimationFrame(initIntro);
};

const resizeElementsIntro = (cb) => {
  [...allItens].forEach((item) => {
    item.removeAttribute('hidden');
  })
  cb();
};

// Método para ajuste em dev 
window.addEventListener('resize', ({ target }) => {
  const { innerWidth } = target;
  console.log('mobile', mobile)
  console.log('innerWidth', innerWidth)
  if (innerWidth > 767) {
    console.log('permitido')
    resizeElementsIntro(hiddenElementsIntro);
  }
});

export {
  initIntro as default,
  funStopAnimation,
  hiddenElementsIntro,
};
