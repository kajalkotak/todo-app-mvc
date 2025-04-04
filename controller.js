"use strict";

import { Model } from "./model.js";
import { view } from "./view.js";

const controller = {
  init() {
    Model.loadTasks();
    this.renderPage(1);

    view.addHandlerAddTask(this.controlAddTask.bind(this));
    view.addHandlerDeleteTask(this.controlDeleteTask.bind(this));
    view.addHandlerSearch(this.controlSearchTask.bind(this));
    view.addHandlerPageChange(this.controlPageChange.bind(this));
  },

  controlAddTask(task) {
    Model.addTask(task);
    this.renderPage(Model.currentPage);
  },

  controlDeleteTask(index) {
    Model.deleteTask(index);
    const totalPages = Model.getTotalPages();
    if (Model.currentPage > totalPages) {
      Model.currentPage = totalPages;
    }
    this.renderPage(Model.currentPage);
  },

  controlSearchTask(query) {
    const filteredTasks = Model.getTasks().filter((task) =>
      task.toLowerCase().includes(query.toLowerCase())
    );
    view.renderTasks(filteredTasks);
  },

  controlPageChange(page) {
    this.renderPage(page);
  },

  renderPage(page) {
    const totalPages = Model.getTotalPages();
    if (page < 1 || page > totalPages) return;

    Model.currentPage = page;
    const tasks = Model.getTasksByPage(page);
    view.renderTasks(tasks);
    view.renderPagination(totalPages, page);
  },
};

controller.init();
