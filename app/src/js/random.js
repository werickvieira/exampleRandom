import { shuffle, removeSpace } from './modulos/util';

let counter = 0;
const newData = [];

const randomItens = (itens, quantity) => {
  const amount = itens.length;
  const arritens = [];
  while (arritens.length < quantity) {
    const curr = itens[Math.floor((Math.random() * amount))];
    if (arritens.indexOf(curr) <= -1) {
      arritens[arritens.length] = curr;
      // continue;
    }
    // arritens[arritens.length] = curr;
  }
  return arritens;
};

const randomAssociate = (currAssociate, itens) => {
  const elements = randomItens(itens, 2);
  const isCharacter = currAssociate.caracteristica.filter(i => (
    elements.every(({ jogador, caracteristica }) => {
      if (currAssociate.jogador === jogador) {
        return false;
      }
      return caracteristica.indexOf(i) > -1;
    })
  ));

  if (counter >= 1000) {
    counter = 0;
    return elements;
  } else if (isCharacter.length <= 0) {
    counter += 1;
    return false;
  }
  counter = 0;
  return elements;
};

const findAssociate = (curr, itens, obj) => {
  const item = obj;
  const value = randomAssociate(curr, itens);
  if (!value) {
    findAssociate(curr, itens, item);
  } else {
    item[curr.correctAnswer] = [];
    item[curr.correctAnswer].push(shuffle(value.concat(curr)));
  }
};

const mountAssociateItens = (selectedItens, itens) => (
  selectedItens.reduce((prev, curr, i) => {
    const item = curr;
    const id = Math.round((Date.now() * (i + 1)) / 1000);
    item.correctAnswer = id;
    findAssociate(item, itens, prev);
    return prev;
  }, {})
);

const controlRandom = (data) => {
  newData.push(mountAssociateItens(randomItens(data, 10), data));
};


const modifyData = itens => (
  itens.map((e) => {
    e.caracteristica = e.caracteristica.split(',').map(removeSpace);
    return e;
  })
);

const initRandom = (data) => {
  controlRandom(modifyData(data));
  return newData;
};

const getDataRandom = () => (
  newData
);


export {
  initRandom as default,
  getDataRandom,
};


// const pipe = (...fns) => (x) => fns.reduce((prev, func) => func(prev), x);
