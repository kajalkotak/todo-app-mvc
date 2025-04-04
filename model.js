"use strict";

export const Model = {
  tasks: [],
  tasksPerPage: 5,
  currentPage: 1,

  addTask(task) {
    this.tasks.push(task);
    this.persistData();
  },

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.persistData();
  },

  persistData() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  },

  loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) this.tasks = JSON.parse(storedTasks);
  },

  getTotalPages() {
    return Math.ceil(this.tasks.length / this.tasksPerPage) || 1;
  },

  getTasksByPage(page) {
    this.currentPage = page;
    const start = (page - 1) * this.tasksPerPage;
    const end = start + this.tasksPerPage;
    return this.tasks.slice(start, end);
  },

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  },

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },
};
