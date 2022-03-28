export default class Storage {
  save(data) {
    localStorage.setItem('task', JSON.stringify(data));
  }

  load() {
    localStorage.getItem('task');
  }
}
