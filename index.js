import taskBoardView from './view/panels.js';
import registry from './registry.js';

registry.add('taskBoard', taskBoardView);

const state = {
  panels: [{
    title: '월요일',
    description: '등록 시간: 0시간'
  },{
    title: '화요일',
    description: '등록 시간: 0시간'
  }]
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.body;
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
  })
}

window.setInterval(() => {
  state.panels = [{
    title: '월요일',
    description: '등록 시간: 0시간'
  },{
    title: '화요일',
    description: '등록 시간: 0시간'
  },{
    title: '수요일',
    description: '등록 시간: 10시간'
  }];

  render();
}, 1000);

render();