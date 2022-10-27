let template;

const createNewTaskPanelNode = () => {
  if(!template) {
    template = document.getElementById('task-list');
  }

  return template.content.firstElementChild.cloneNode(true);
}

export const getTaskPanelElement = ({
    title,
    description
}) => {
  const element = createNewTaskPanelNode();

  element.querySelector('.task-headline-title-text').textContent=title;
  element.querySelector('.task-header-description-text').textContent=description;

  return element;
}

  export default (targetElement, {panels}) => {
    const newTaskBoard = targetElement.cloneNode(true);

    newTaskBoard.innerHTML = '';

    panels.map(getTaskPanelElement).forEach(element => newTaskBoard.appendChild(element));
    
    return newTaskBoard;
  }