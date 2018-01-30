import axios from 'axios';
import { converteDadosPlanilha } from './util';

function loadCSV(resolve) {
  axios.get('http://infograficos-estaticos-dev.s3.amazonaws.com/copaCabeluda.csv?id=10')
    .then((response) => {
      const arr = response.data.split('\n');
      const newArr = arr.map(item => item.split(';'));
      resolve(converteDadosPlanilha(newArr));
    });
}

export default new Promise(loadCSV);

