"use strict";

export const view = {
  taskContainer: document.querySelector("#todo-list"),
  taskInput: document.querySelector("#todo-input"),
  addTaskBtn: document.querySelector("#add_btn"),
  searchInput: document.querySelector("#search-input"),
  paginationContainer: document.createElement("div"),

  renderTasks(tasks) {
    this.taskContainer.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
      ${task} <button data-index="${index}" class="delete-btn">X</button>`;
      this.taskContainer.appendChild(taskItem);
    });

    if (tasks.length === 0) {
      this.taskContainer.innerHTML = `<p>No tasks found.</p>`;
    }
  },

  clearInput() {
    this.taskInput.value = "";
  },

  renderPagination(totalPages, currentPage) {
    this.paginationContainer.innerHTML = "";
    this.paginationContainer.classList.add("pagination");

    // Previous Button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.classList.add("page-btn");
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => this.onPageChange(currentPage - 1));
    this.paginationContainer.appendChild(prevBtn);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.classList.add("page-btn");
      if (i === currentPage) pageBtn.classList.add("active");
      pageBtn.addEventListener("click", () => this.onPageChange(i));
      this.paginationContainer.appendChild(pageBtn);
    }

    // Next Button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.classList.add("page-btn");
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => this.onPageChange(currentPage + 1));
    this.paginationContainer.appendChild(nextBtn);

    document.querySelector(".app").appendChild(this.paginationContainer);
  },

  addHandlerAddTask(handler) {
    this.addTaskBtn.addEventListener("click", () => {
      const task = this.taskInput.value.trim();
      if (task) {
        handler(task);
        this.clearInput();
      }
    });
  },

  addHandlerDeleteTask(handler) {
    this.taskContainer.addEventListener("click", (e) => {
      if (!e.target.classList.contains("delete-btn")) return;
      const index = e.target.dataset.index;
      handler(index);
    });
  },

  addHandlerSearch(handler) {
    this.searchInput.addEventListener("input", () => {
      const query = this.searchInput.value.trim();
      handler(query);
    });
  },

  addHandlerPageChange(handler) {
    this.onPageChange = handler;
  },
};
