import { shuffle, removeSpace } from './modulos/util';

let counter = 0;
const newData = [];
const groupCharacter = [];

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

const randomAssociate = (currAssociate, allItens) => {
  const itens = groupCharacter[0][currAssociate.caracteristica[0]];
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
    return randomItens(allItens, 2);
  } else if (isCharacter.length <= 0) {
    counter += 1;
    return false;
  }
  counter = 0;
  return elements;
};

const findAssociate = (curr, itens, obj) => {
  const value = randomAssociate(curr, itens);
  if (!value) {
    findAssociate(curr, itens, obj);
  } else {
    obj[curr.correctAnswer] = [];
    obj[curr.correctAnswer].push(shuffle(value.concat(curr)));
  }
};

const mountAssociateItens = (selectedItens, itens) => (
  selectedItens.reduce((prev, curr, i) => {
    const id = Math.round((Date.now() * (i + 1)) / 1000);
    curr.correctAnswer = id;
    findAssociate(curr, itens, prev);
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

const groupByCharacter = (data) => {
  const itens = data.reduce((prev, curr) => {
    prev[curr.caracteristica[0]] = prev[curr.caracteristica[0]] || [];
    prev[curr.caracteristica[0]].push(curr);
    return prev;
  }, {});
  groupCharacter.push(itens);
};

const initRandom = (data) => {
  const itens = modifyData(data);
  groupByCharacter(itens);
  controlRandom(itens);
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
