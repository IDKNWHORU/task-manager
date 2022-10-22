let dragged;
let originAncestor;

const removeTask = e => {
    const taskBody = e.target.closest('.task-body');
    const removedTask = e.target.closest('.task');

    taskBody.removeChild(removedTask);
}

const editTitle = e => {
    const titleText = e.target;
    const title = e.target.closest('.title');
    console.log(titleText.innerText);

    title.innerHTML = `<input class="title-editor" value="${titleText.innerText}" />`;

    Promise.resolve().then(() => {
        const titleEditor = title.querySelector('.title-editor');
        titleEditor.focus();
        titleEditor.addEventListener('blur', () => {
            const text = titleEditor.value || 'Task';

            title.innerHTML = `<div class='title-text' onclick='editTitle(event)'>${text}</div>`;
        });
        titleEditor.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                titleEditor.blur();
            }

            if (e.keyCode === 9) {
                e.preventDefault();
                if (e.shiftKey) {
                    console.log('shift + tab');
                } else {
                    const description = title.closest('.task').querySelector('.description');
                    description.querySelector('.description-text').click();
                }
            }
        });
    });
}

const editDescription = e => {
    const descriptionText = e.target;
    const description = e.target.closest('.description');

    description.innerHTML = `<input class="description-editor" value="${descriptionText.innerText}" />`;

    Promise.resolve().then(() => {
        const descriptionEditor = description.querySelector('.description-editor');
        descriptionEditor.focus();
        descriptionEditor.addEventListener('blur', () => {
            const text = descriptionEditor.value || 'Description';
            description.innerHTML =
                `<div class='description-text' onclick='editDescription(event)'>${text}</div>`;
        });
        descriptionEditor.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                descriptionEditor.blur();
            }

            if (e.keyCode === 9) {
                e.preventDefault();
                if (e.shiftKey) {
                    const title = description.closest('.task').querySelector('.title');
                    title.querySelector('.title-text').click();
                } else {
                    const options = description.closest('.task').querySelector('.options');
                    options.querySelector('.option-timebox').querySelector('.timebox-text').click();
                }
            }
        });
    });
}

const editTime = e => {
    const timeText = e.target;
    const time = e.target.closest('.option-timebox');

    time.innerHTML = `<input class="time-editor" value=${timeText.innerText} />`;

    Promise.resolve().then(() => {
        const timeEditor = time.querySelector('.time-editor');
        timeEditor.focus();
        timeEditor.addEventListener('blur', () => {
            const text = timeEditor.value || '00:00';
            time.innerHTML = `<div class='timebox-text' onclick='editTime(event)'>${text}</div>`;
        });
        timeEditor.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                timeEditor.blur();
            }

            if (e.keyCode === 9) {
                e.preventDefault();
                if (e.shiftKey) {
                    const description = time.closest('.task').querySelector('.description');
                    description.querySelector('.description-text').click();
                } else {
                    const combobox = time.closest('.task').querySelector('.combobox');
                    combobox.click();
                }
            }
        });
    });
}

const editCombo = e => {
    const comboText = e.target;
    const combo = e.target.closest('.combobox');

    const options = ['대기', '진행중', '완료'];

    const selectOptionsHTML = options.map(option => {
        if (option === comboText.innerText) {
            return `<option value=${option} selected>${option}</option>`;
        }
        return `<option value=${option}><div style="background-color: green;">${option}</div></option>`;
    }).join('');

    combo.innerHTML = `
      <select class='combo-editor' onclick='event.stopPropagation()'>
        ${selectOptionsHTML}
      </select>`;

    Promise.resolve().then(() => {
        const comboEditor = combo.querySelector('.combo-editor');
        comboEditor.focus();
        comboEditor.addEventListener('blur', () => {
            const text = comboEditor.value || 'Combo';
            combo.innerHTML = `<div class='combobox-text'>${text}</div>`;
            combo.dataset.status = text;
        });
        comboEditor.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                comboEditor.blur();
            }
            if (e.keyCode === 9) {
                e.preventDefault();
                if (e.shiftKey) {
                    const time = combo.closest('.task').querySelector('.option-timebox');
                    time.querySelector('.timebox-text').click();
                } else {
                    console.log('tab');
                }
            }
        });
    });
}

const taskList = ({
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
  const task = ({
    title,
    description,
    hour,
    status
  }) => `
  <div class='task' draggable='true'>
    <div class='header'>
      <div class='title'>
        <div class='title-text' onclick='editTitle(event)'>${title}</div>
      </div>
      <div class='icon-delete' onclick='removeTask(event)'></div>
    </div>
    <div class='description'>
      <div class='description-text' onclick='editDescription(event)'>${description}</div>
    </div>
    <div class='options'>
      <div class='option-squarebox'>
        <input type='checkbox' id='squarebox' />
        <label class="btn" for="squarebox">
          <div class='squarebox'></div>
          <div class="dropdown-content">
            <div class="dropdown-item">
              <div class='squarebox-green' data-bgcolor='blue'></div>
              <div>신규</div>
            </div>
            <div class="dropdown-item">
              <div class='squarebox-blue'></div>
              <div>변경</div>
            </div>
            <div class="dropdown-item">
              <div class='squarebox-red'></div>
              <div>버그</div>
            </div>
          </div>
        </label>
      </div>
      <div class='option-timebox'>
        <div class='timebox-text' onclick='editTime(event)'>${hour}</div>
      </div>
      <div class='option-combobox'>
        <div class='combobox' onclick='editCombo(event)' data-status=${status}>
          <div class='combobox-text'>${status}</div>
        </div>
      </div>
    </div>
  </div>`;

  const taskLists = [taskList({
    title: '월요일',
    description: '등록 시간: 0시간'
  }), taskList({
    title: '화요일',
    description: '등록 시간: 0시간'
  }), taskList({
    title: '수요일',
    description: '등록 시간: 0시간'
  }), taskList({
    title: '목요일',
    description: '등록 시간: 0시간'
  }), taskList({
    title: '금요일',
    description: '등록 시간: 0시간'
  }), taskList({
    title: 'Task',
    description: '등록 시간: 0시간'
  })];

  document.getElementsByClassName('task-board')[0].innerHTML = taskLists.join('');
  Promise.resolve().then(() => {
    const taskLists = document.getElementsByClassName('task-body');
    const taskBodyMask = `<div class='task-body-mask'></div>`;
    const tasks = [task({
      title: 'Task',
      description: 'Description',
      hour: '00:00',
      status: '대기'
    }), task({
      title: 'Task',
      description: 'Description',
      hour: '00:00',
      status: '대기'
    }), task({
      title: 'Task',
      description: 'Description',
      hour: '00:00',
      status: '대기'
    }), task({
      title: 'Task',
      description: 'Description',
      hour: '00:00',
      status: '대기'
    }), task({
      title: 'Task',
      description: 'Description',
      hour: '00:00',
      status: '대기'
    }), task({
      title: 'Task',
      description: 'Description',
      hour: '00:00',
      status: '대기'
    }), task({
      title: 'Task',
      description: 'Description',
      hour: '00:00',
      status: '대기'
    })];

    for (const taskList of taskLists) {
      taskList.innerHTML = taskBodyMask + tasks.join('');
    }
  }).then(_ => {
    const taskLists = document.getElementsByClassName('task-body');
    const taskBodyMasks = document.getElementsByClassName('task-body-mask');
    const tasks = [...taskLists].map(taskList => taskList.getElementsByClassName('task'));

    document.addEventListener('dragstart', e => {
      dragged = e.target;
      originAncestor = dragged.closest('.task-body');
      for (const taskBodyMask of taskBodyMasks) {
        const ancestor = taskBodyMask.closest('.task-body');

        if (ancestor !== originAncestor) {
          taskBodyMask.classList.add('visible');
        }
        taskBodyMask.classList.remove('dragover');
      }
      for (const taskList of taskLists) {
        taskList.classList.add('task-body-dragging');
      }
    });

    document.addEventListener('dragend', e => {
      for (const taskBodyMask of taskBodyMasks) {
        taskBodyMask.classList.remove('visible');
      }
      for (const taskList of taskLists) {
        taskList.classList.remove('task-body-dragging');
      }
      dragged = null;
      originAncestor = null;
    });

    document.addEventListener('dragover', e => {
      e.preventDefault();
    }, false);

    document.addEventListener('dragenter', e => {
      if (e.target.classList.contains('task-body-mask')) {
        e.target.classList.add('dragover');
      }
    });

    document.addEventListener('dragleave', e => {
      if (e.target.classList.contains('task-body-mask')) {
        event.target.classList.remove('dragover');
      }
    });

    document.addEventListener('drop', e => {
      e.preventDefault();
      const targetAncestor = e.target.closest('.task-body');
      if (e.target.className.includes('task-body-mask')) {
        targetAncestor.appendChild(dragged);
      }
    });
  })