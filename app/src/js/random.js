let counter = 0;
const newData = [];

const initRandom = (data) => {
	controlRandom(modifyData(data));
};

const getDataRandom = () => {
	return new Promise(controlChechData);
};	

const controlChechData = (resolve, reject) => {
	checkData().then((e) => {
		console.log("eXS", e);
		resolve(e);
	})
		.catch(() => {
			controlChechData(resolve, reject);
		});
};

const checkData = () => {
	return new Promise((resolve, reject) => {
		if (newData.length === 0) {
			reject();
		} else {
			console.log("RESOLVE", newData.length);
			resolve(newData);
		}	
	});
};

const controlRandom = (data) => {
	const itensRandom = randomItens(data, 10);
	const mount = mountAssociateItens(itensRandom, data);
	newData.push(mount);
};

const randomItens = (itens,	quantity) => {
	const amount = itens.length;
	const arritens = [];
	while (arritens.length < quantity) {
		const curr = itens[Math.floor((Math.random() * amount))];
		if (arritens.indexOf(curr) > -1) {
			continue;
		}
		arritens[arritens.length] = curr;
	}
	return arritens;
};

const mountAssociateItens = (selectedItens, itens) => {
	return selectedItens.reduce((prev, curr, i) => {
		const id = Math.round(Date.now() * (i+1) / 1000);
		curr['correctAnswer'] = id;
		controlAssociate(curr, itens, prev);
		return prev;
	}, {});
};

const controlAssociate = (curr, itens, obj) => {
	findAssociate(curr, itens, obj);
};

const findAssociate = (curr, itens, obj) => {
	const value = randomAssociate(curr, itens);
	if (!value) {
		findAssociate(curr, itens, obj);
	} else {
		obj[curr.jogador] = [];
		obj[curr.jogador].push(shuffle(value.concat(curr)));
	}
};

const randomAssociate = (currAssociate, itens) => {
	const elements = randomItens(itens, 2);
	const isCharacter = currAssociate.caracteristica.filter(i => { 
		return elements.every((e) => {
			if (currAssociate.jogador === e.jogador) {
				return false;
			}
			return e.caracteristica.indexOf(i) > -1;
		});
	});

	if (counter >= 1000) {
		counter = 0;
		return elements;
	} else if (isCharacter.length <= 0) {
		++counter;
		return false;
	} else {
		counter = 0;
		return elements;
	}
};

const modifyData = (itens) => (
	itens.map((e) => {
		e['caracteristica'] = e['caracteristica'].split(",").map(removeSpace);
		return e;
	})
);

const removeSpace = s => s.replace(/\s+/, "");

const shuffle = arr => (
	arr.sort( () => .5 - Math.random() )
);

export {
	initRandom as default,
	getDataRandom
};
