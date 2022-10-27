let template;

const createBoardElement = () => {
    if (!template) {
        template = document.getElementById('task-board');
    }

    return template.content.firstElementChild.cloneNode(true);
}

export default (targetElement) => {
    const newTaskApp = targetElement.cloneNode(true);
    console.log(newTaskApp);
    newTaskApp.innerHTML = '';
    newTaskApp.appendChild(createBoardElement());

    return newTaskApp;
}