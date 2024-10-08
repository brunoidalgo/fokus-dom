const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

const taskList = document.querySelector('.app__section-task-list');

const descParagraph = document.querySelector('.app__section-active-task-description');

const btnRemove = document.querySelector('#btn-remover-concluidas');
const btnRemoveAll = document.querySelector('#btn-remover-todas');

// Lista de Tarefas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let taskSelect = null;
let liTaskSelect = null;

function attTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

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


    btn.onclick = () => {
        // debugger
        const newDes = prompt("Qual o nome da tarefa ?");
        // console.log(`Valor: ` + newDes);
        if(newDes) {
            paragraph.textContent = newDes;
            task.description = newDes;
            attTask();
        }
        else {
            alert('Valor digitado é inválido.')
        }
    };

    imgBtn.setAttribute('src','/imagens/edit.png');
    btn.classList.add('app_button-edit');
    btn.append(imgBtn);


    li.append(svg);
    li.append(paragraph);
    li.append(btn);

    if (task.complet) {
        li.classList.add('app__section-task-list-item-complete');
        btn.setAttribute('disabled', 'desabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach((el) => {
                el.classList.remove('app__section-task-list-item-active')
            });
            if(taskSelect == task) {
                descParagraph.textContent = '';
                taskSelect = null;
                liTaskSelect = null;
                return
            }
            taskSelect = task;
            liTaskSelect = li;
            descParagraph.textContent = task.description;
            li.classList.add('app__section-task-list-item-active');
        }
    }
    
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
    attTask();
    textArea.value = '';
    formAddTask.classList.add('hidden');
});


tasks.forEach(task => {
    const elementTask = addTask(task);
    taskList.append(elementTask);
});

document.addEventListener('FocoFinalizado', () => {
    if (taskSelect && liTaskSelect) {
        liTaskSelect.classList.remove('app__section-task-list-item-active');
        liTaskSelect.classList.add('app__section-task-list-item-complete');
        liTaskSelect.querySelector('button').setAttribute('disabled', 'desabled');
        taskSelect.complet = true;
        attTask()
    }
})

const removeTasks = (onlyComplets) => {
    const seletctor = onlyComplets ? '.app__section-task-list-item-complete' :
    '.app__section-task-list-item' ;
    document.querySelectorAll(seletctor).forEach(element => {
        element.remove()
    });
    tasks = onlyComplets ? tasks.filter(task => !task.complet) : [];
    attTask();
};

btnRemove.onclick = () => removeTasks(true);
btnRemoveAll.onclick = () => removeTasks(false);