import { getDataRandom } from './random';

const initView = () => {
	const data = getDataRandom();
	console.log("DATA", data)
	data.then((e) => {
		console.log("EA", e.length);
	})
};

export {
	initView as default
};
