import taskBoardView from './panels.js';

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true);

    const board = element.querySelector('.task-board');

    board.replaceWith(taskBoardView(board, state));

    return element; 
}