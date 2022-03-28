export default class Taskbord {
  constructor() {
    this.toDo = document.querySelector('.todo');
    this.inProgress = document.querySelector('.in-progress');
    this.done = document.querySelector('.done');
  }

  addTask(parent, value) {
    const task = document.createElement('div');
    task.className = 'item-task';
    task.innerHTML = `
      ${value}
      <div class="delete-task hidden">&#x2716;</div>
    `;
    parent.appendChild(task);
  }

  addTasks(parent, arr) {
    for (let i = 0; i < arr.length; i += 1) {
      this.addTask(parent, arr[i]);
    }
  }

  initTasks(initData) {
    this.addTasks(this.toDo, initData.toDo);
    this.addTasks(this.inProgress, initData.inProgress);
    this.addTasks(this.done, initData.done);
  }
}
