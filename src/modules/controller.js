import {
  showProjectForm,
  showTaskForm,
  showBlurBG,
  selectors,
  showTask,
} from "./dom.js";
import Task from "./task.js";
import Project from "./project.js";

const projects = [];

function createTask() {
  const task = new Task(
    selectors.userTitle.value,
    selectors.userDesc.value,
    selectors.userDueDate.value,
    selectors.userPriority.value
  );
  projects[0].addTask(task);
}

function displayTask(index) {
  selectors.taskContent.textContent = "";
  projects[index].tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("add-task-content");
    li.textContent = task.title;
    li.textContent += task.description;
    li.textContent += task.dueDate;
    li.textContent += task.priority;
    selectors.taskContent.appendChild(li);
  });
}

//* event delegation for projects
selectors.navProject.addEventListener("click", (e) => {
  const liItems = document.querySelectorAll(".nav-projects li");
  liItems.forEach((liItems) => {
    if (e.target) {
      liItems.classList.remove("active");
    }
  });
  e.target.classList.add("active");
  selectors.mainTitle.textContent = e.target.textContent;
  const index = selectedProjectIndex(e.target);
  displayTask(index);
  console.log(projects);
});

// project object
function createProject() {
  const project = new Project(selectors.userProject.value);
  projects.push(project);
}

function selectedProjectIndex(project) {
  return project.dataset.index;
}

function displayProjects() {
  const navProj = document.querySelector(".nav-projects");
  const li = document.createElement("li");

  projects.forEach((project, index) => {
    li.setAttribute("data-index", index);
    li.classList.add("add-project-content");
    li.textContent = `${project.name}`;
    selectors.mainTitle.textContent = `${project.name}`;
    navProj.appendChild(li);
  });
}

function projectBtnSubmit() {
  selectors.addProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createProject();
    displayProjects();
    showProjectForm();
    showBlurBG();
    selectors.projectForm.reset();
    console.log(projects);
  });
}

function projectBtnListener() {
  const projectBtn = document.querySelector(".project-btn");
  projectBtn.addEventListener("click", (e) => {
    showProjectForm();
    showBlurBG();
  });
}

function taskBtnSubmit() {
  selectors.addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showTask();
    // TODO how to get selected project for creating task
    const index = selectedProjectIndex(e.target);
    createTask(index);
    showTaskForm();
    showBlurBG();
    selectors.taskForm.reset();
    console.log(projects);
  });
}

function taskBtnListener() {
  const taskBtn = document.querySelector(".task-btn");
  taskBtn.addEventListener("click", (e) => {
    showTaskForm();
    showBlurBG();
  });
}

selectors.taskContent.addEventListener("click", (e) => {
  e.target.classList.toggle("checked");
});

function listeners() {
  projectBtnListener();
  projectBtnSubmit();
  taskBtnListener();
  taskBtnSubmit();
}
//* program flow
function render() {
  listeners();
}

export { render };
