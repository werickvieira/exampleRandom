import initIntro, {
  funStopAnimation,
  hiddenElementsIntro,
  resizeElementsIntro,
} from './intro';

const initView = (data) => {
  initIntro();
  hiddenElementsIntro();
  window.addEventListener('resize', resizeElementsIntro);
  console.log('data', data[0]);
};

export {
  initView as default,
};
