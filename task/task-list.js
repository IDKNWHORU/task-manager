export const taskList = ({
    title,
    description
}) => `
  <div class='task-list'>
    <div class='task-header'>
      <div class='task-headline'>
        <div class='task-headline-title'>
          <div class='task-headline-title-text'>${title}</div>
        </div>
        <div class='icon-vertical-dot'></div>
        </img>
      </div>
      <div class='task-header-description'>
        <div class='task-header-description-text'>${description}</div>
      </div>
    </div>
    <div class='task-body'>
    </div>
  </div>`;