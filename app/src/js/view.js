import initIntro, { funStopAnimation } from './intro';

const initView = (data) => {
  initIntro();
  console.log('data', data[0]);
};

export {
  initView as default,
};
