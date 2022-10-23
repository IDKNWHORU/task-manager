import appView from './view/app.js';

const state = {
  panels: [{
    title: '월요일',
    description: '등록 시간: 0시간'
  },{
    title: '화요일',
    description: '등록 시간: 0시간'
  }]
}

const main = document.body;

window.requestAnimationFrame(() => {
  const newMain = appView(main, state)
  main.replaceWith(newMain)
})