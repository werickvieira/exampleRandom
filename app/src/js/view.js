const initView = (data) => {
	console.log("initView");
	data.forEach((item) => {
		console.log("item", item);
	});
};

export {
	initView as default
};
