
import csvToJSON from './modulos/getcsv';
import initView from './view';
import initRandom from './random';

const initApp = () => {
	csvToJSON
		.then(initRandom)
		.then(initView);
};


export {
	initApp as default
};
