import initIntro, {
  funStopAnimation,
  hiddenElementsIntro,
} from './intro';

const initView = (data) => {
  initIntro();
  hiddenElementsIntro();
  console.log('data', data[0]);
};

export {
  initView as default,
};
