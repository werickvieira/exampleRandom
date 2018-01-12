import configs from './../../../config';
const { s3URL, qaURL } = configs;


/**
 * Transforma dados de um csv em um array de objetos
 * @param  {Array} e array de elementos
 * @return {Array} RETORNO array de objetos
 */

const converteDadosPlanilha = (e) => {
	if (!e) {
		return;
	}
	const DATA = e;
	const KEYS = DATA[0];
	const EMPTY_ROW = "(^-$)"; // -

	const DADOS = DATA.filter((item, index, arr) => arr.indexOf(KEYS) !== index );
	const RETORNO = DADOS.reduce((prev, curr) => {
		const obj = curr.reduce((previus, current, i) => {
			previus[removeAcentos( convertToCamel(toLowerCase(KEYS[i].trim())) )] = current.replace(EMPTY_ROW, "") || null;
			return previus;
		}, {});
		prev.push(obj);
		return prev;
	}, []);
	return RETORNO;
};


/**
 * Remove os acentos de uma determinada string
 * @param  {String} s string de entrada
 * @return {String} s string de saída
 */

const removeAcentos = (s) => {
	const i = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖŐòóôõöőÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜŰùúûüűÑñŠšŸÿýŽž'.split('');
	const o = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUUuuuuuNnSsYyyZz'.split('');
	const map = {};
	i.forEach((el, idx) => map[el] = o[idx]);
	return s.replace(/[^A-Za-z0-9]/g, (ch) => map[ch] || ch );
};


/**
 * Retorna uma string com os caracteres em caixa baixa
 * @param  {String} value é a string de entrada
 * @return {String} value é a string de saída
 */

const toLowerCase = value => value.toLowerCase(); 


/**
 * Adiciona escape a um conjunto limitado de caracteres de uma string
 * @param  {String} str é a string de entrada
 * @return {String} str é a string de saída
 */

const escapeRegExp = str  => str.replace(/[-[\]{}()*+?.\\^$\\|]/g, "\\$&");


/**
 * Retorna uma lista ordenada, quando nenhum objeto é adicionado,
 * a ordem será utilizada como default
 * @param  {Array} lista com os objetos
 * @param  {String} objeto a ser o parâmetro da ordenação
 * @param  {String} direcao define se a ordenação é crescente ou descrecente
 * @return {Array} lista ordenada, o default será definido pela ordem
 */

const ordernaDados = (lista, objeto, direcao) => {
	return lista.sort((a, b) => {
		if (direcao === "asc") {
			return a[objeto].localeCompare(b[objeto]);
		} else if (direcao === "desc") {
			return b[objeto].localeCompare(a[objeto]);
		} else {
			return a['ordem'] - b['ordem'];
		}
	});
};


/**
 * Remove o atributo se um elemento irmão já o contém
 * @param  {Element} target referencia para busca dos seus irmãos
 * @param  {String}  attr com o valor dor atributo a ser removido 
 */

const removeAtributo = (target, attr) => {
	Array.prototype.filter.call(target.parentNode.children, (child) => {
		if (child !== target) {
			child.getAttribute(attr) !== "" ? child.removeAttribute(attr) : '';
		}
	});
};


/**
 * Retorna o bucket de acordo com o ambiente
 * @param  {Int} deverá ser usado 0 para infogbucket e 1 para infograficos-estaticos
 */

const defineBucketURL = (index) => {
	const bucket = { 
		dev: ["infogbucket-dev", "infograficos-estaticos-dev"],
		prod: ["https://d37iydjzbdkvr9.cloudfront.net", "https://deoliyp60f2gq.cloudfront.net"]
	};

	const host = window.location.host.split(".")[0];
	if (host !== "infograficos") {
		return `https://${bucket['dev'][index]}.s3.amazonaws.com`; 
	} else {
		return `${bucket['prod'][index]}`; 
	}
};

/**
 * Retorna a URL de acordo com o ambiente
 */

const defineAmbienteURL = () => {
	const host = window.location.host.split(".")[0];
	return host !== "infograficos" ? qaURL : s3URL; 
};


/**
 * 
 */

const scrollToTop = () => {
	const c = document.documentElement.scrollTop || document.body.scrollTop;
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, c - c / 8);
	}
};

const convertToCamel = s => s.replace(/(\s\w)/g, (m) => m[1].toUpperCase());

export {
	converteDadosPlanilha,
	removeAcentos,
	ordernaDados,
	removeAtributo,
	toLowerCase,
	escapeRegExp,
	defineBucketURL,
	defineAmbienteURL,
	scrollToTop
};
