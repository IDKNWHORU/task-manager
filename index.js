import taskBoardView from './view/panels.js';
import registry from './registry.js';
import applyDiff from './applyDiff.js';
import appView from './view/board.js';

registry.add('app', appView)
registry.add('taskBoard', taskBoardView);

const state = {
  panels: [{
    title: '월요일',
    description: '등록 시간: 0시간'
  }, {
    title: '화요일',
    description: '등록 시간: 0시간'
  }]
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.body;
    const newMain = registry.renderRoot(main, state);
    console.log({main, newMain});
    applyDiff(document.body, main, newMain);
  })
}

window.setInterval(() => {
  state.panels = [{
    title: '월요일',
    description: '등록 시간: 0시간'
  }, {
    title: '화요일',
    description: '등록 시간: 0시간'
  }, {
    title: '수요일',
    description: '등록 시간: 10시간'
  }];

  render();
}, 1000);

render();