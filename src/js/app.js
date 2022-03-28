import Taskbord from './Taskboard';
import initData from './initData';
import Storage from './Storage';

const storage = new Storage();
const taskboard = new Taskbord();

let dragged = null;
let ghost = null;
let widthEl = null;
let heightEl = null;
let topEl = null;
let leftEl = null;

const tasks = document.querySelector('.tasks');

function dragAndDrop(item, element) {
  const closestElement = document.elementFromPoint(item.clientX, item.clientY);
  const { top } = closestElement.getBoundingClientRect();

  if (closestElement.classList.contains('item-task')) {
    if (item.pageY > windows.scrollY + top + closestElement.offsetHeight / 2) {
      closestElement.closest('.item-tasks')
      .insertBefore(element, closestElement.nextElementSibling);
    } else {
      closestElement.closest('.item-tasks')
      .insertBefore(element, closestElement);
    }
  } else if (
    closestElement.classList.contains('item-tasks')
    && !closestElement.querySelector('.item-task')
  ) {
    closestElement.append(element);
  }
}

function addObjectTasks() {
  const toDo = document.querySelectorAll('.todo .item-tasks .item-task');
  const inProgress = document.querySelectorAll(
    '.in-progress .item-tasks .item-task'
  );
  const done = document.querySelectorAll('.done .item-tasks .item-task');
  const objTasks = {
    todo: [],
    inProgress: [],
    done: [],
  };

  for (const item of toDo) {
    objTasks.todo.push(item.textContent.replace('X', ''));
  }

  for (const item of inProgress) {
    objTasks.inProgress.push(item.textContent.replace('X', ''));
  }
  for (const item of done) {
    objTasks.done.push(item.textContent.replace('X', ''))
  }
  storage.save(objTasks);
}

document.addEventListener('DOMContentLoaded', () => {
  const storageData = JSON.parse(storage.load());
  if (storageData !== null) {
    taskboard.initTasks(storageData);
  } else {
    taskboard.initTasks(init());
  }
});

tasks.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('add-task')) {
    e.target.parentNode.querySelector('.input-task')
    .classList.remove('hidden');
    
    e.target.classList.add('hidden');
  } else if (e.target.classList.contains('b-cancel-task')) {
    e.target
      .closest('.col-tasks')
      .querySelector('.add-task')
      .classList.remove('hidden');
    e.target.parentNode.classList.add('hidden');
  } else if (e.target.classList.contains('b-add-task')) {
    const addedEl = e.target
      .closest('.col-tasks')
      .querySelector('.item-tasks');
    const enteredEl = e.target.closest('.input-task').querySelector('.text-task');
    taskboard.addTask(addedEl, enteredEl.value);
    enteredEl.value = '';
    e.target
      .closest('.col-tasks')
      .querySelector('.add-task')
      .classList.remove('hidden');
    e.target.parentNode.classList.add('hidden');
    addObjectTasks();
  } else if (e.target.classList.contains('del-task')) {
    const itemDel = e.target.parentNode;
    itemDel.parentNode.removeChild(itemDel);
    addObjectTasks();
  } else if (e.target.classList.contains('item-task')) {
    e.preventDefault();
    e.target.querySelector('.del-task').classList.add('hidden');
    const { top, left } = e.target.getBoundingClientRect();
    dragged = e.target;
    widthEl = dragged.offsetWidth;;
    heightEl = dragged.offsetHeight;
    topEl = e.pageX - left;
    leftEl = e.pageY - top;

    ghost = e.target.cloneNode(true);
    ghost.innerHTML = '';
    ghost.style.backgroundColor = 'gray';
    ghost.style.width = `${elWidth}px`;
    ghost.style.height = `${elHeight}px`;
    
    dragged.classList.add('dragged');
    e.target.parentNode.insertBefore(ghost, e.target.nextElementSibling);

    dragged.style.left = `${e.pageX - leftEl}px`;
    dragged.style.top = `${e.pageY - topEl}px`;
    dragged.style.width = `${widthEl}px`;
    dragged.style.height = `${heightEl}px`;
  }
});
