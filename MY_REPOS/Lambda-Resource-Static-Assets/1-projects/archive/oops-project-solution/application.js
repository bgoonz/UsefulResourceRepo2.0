const fs = require("fs");

class State {
  constructor(filePath) {
    this.categories = [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ];
    this.filePath = filePath;
    this.tasks = [];
  }

  addNote(text) {
    this.tasks.push(new Note(text, false));
  }

  addTask(title, description, categoryIndex) {
    this.tasks.push(new Task(title, description, categoryIndex));
  }

  getCategoryByIndex(index) {
    return this.categories[index];
  }

  getCategoryCount() {
    return this.categories.length;
  }

  getItemByIndex(index) {
    return this.tasks[index];
  }

  getItemCount() {
    return this.tasks.length;
  }

  getItemIsIncomplete(index) {
    return !this.tasks[index].completed;
  }

  getItemListText(index) {
    return this.tasks[index].getShortText();
  }

  loadFromJson(json) {
    const { categories, tasks } = JSON.parse(json);

    for (let i = 0; i < categories.length; i += 1) {
      this.categories[i] = categories[i];
    }

    for (let i = 0; i < tasks.length; i += 1) {
      const taskData = tasks[i];
      let task = null;
      if (taskData.type === "Note") {
        task = new Note(taskData.text, taskData.completed);
      } else if (taskData.type === "Task") {
        const { title, description, categoryId, completed } = taskData;
        task = new Task(title, description, categoryId, completed);
      }
      this.tasks.push(task);
    }
  }

  save() {
    const data = {
      tasks: this.tasks,
      categories: this.categories,
    };
    fs.writeFile(this.filePath, JSON.stringify(data), (err) => {});
  }

  searchByTerm(term) {
    let results = [];
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (this.tasks[i].matches(term)) {
        results.push(i);
      }
      if (results.length > 10) {
        break;
      }
    }
    return results;
  }

  setCategory(index, value) {
    this.categories[index] = value;
  }
}

class Note {
  constructor(text, completed) {
    this.type = "Note";
    this.text = text;
    this.completed = completed;
  }

  complete() {
    this.completed = true;
  }

  getShortText() {
    return this.text.substring(0, 70);
  }

  matches(term) {
    return this.text.indexOf(term) > -1;
  }
}

class Task {
  constructor(title, description, categoryIndex, completed) {
    this.type = "Task";
    this.title = title;
    this.description = description;
    this.categoryIndex = categoryIndex;
    this.completed = completed;
  }

  complete() {
    this.completed = true;
  }

  getShortText() {
    return this.title.substring(0, 70);
  }

  matches(term) {
    return this.title.indexOf(term) > -1 || this.description.indexOf(term) > -1;
  }
}

module.exports = {
  Task,
  Note,
  State,
};
