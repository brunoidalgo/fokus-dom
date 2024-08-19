const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

const taskList = document.querySelector('.app__section-task-list');

// Lista de Tarefas
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description');
    paragraph.textContent = task.description;

    const btn = document.createElement('button');
    const imgBtn = document.createElement('img');

    imgBtn.setAttribute('src','/imagens/edit.png');
    btn.classList.add('app_button-edit');
    btn.append(imgBtn);


    li.append(svg);
    li.append(paragraph);
    li.append(btn);

    return li;
};

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});

formAddTask.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        description: textArea.value
    }
    tasks.push(task);
    const elementTask = addTask(task);
    taskList.append(elementTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    textArea.value = '';
    formAddTask.classList.add('hidden');
});


tasks.forEach(task => {
    const elementTask = addTask(task);
    taskList.append(elementTask);
});