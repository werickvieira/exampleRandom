import '../../src/sass/main.scss';
import csvToJSON from './modulos/getcsv';
import initView from './view';
import initRandom from './random';

const initApp = () => {
  csvToJSON
    .then(initRandom)
    .then(initView);
};

initApp();
