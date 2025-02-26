import { handleDelete } from "@utils/handleDelete";
import { handleEdit } from "@utils/handleEdit";
import type { Todo } from "src/types/todo";
import { IoTrashOutline, IoEllipsisHorizontalSharp } from "react-icons/io5";


export function addEventListeners(todoList: HTMLElement | null) {
  if (!todoList) return;
  const editButtons = todoList.querySelectorAll(".edit-button");


  const deleteButtons = todoList.querySelectorAll(".delete-button");

  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const todoId = (e.currentTarget as HTMLButtonElement).dataset.todoId;
      if (todoId) {
        handleEdit(todoId);
      }
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const todoId = (e.currentTarget as HTMLButtonElement).dataset.todoId;
      if (todoId) {
        handleDelete(todoId);
      }
    });
  });
}

function getRemainingTime(todo: Todo){
  const date = Math.round((new Date(todo.dueDate,).getTime() - new Date().getTime())/86400000)
  const daysInaMonth = 30
  const monthsInaYear = 12
  const years = Math.floor((date/daysInaMonth)/monthsInaYear)
  const months = Math.floor(date/daysInaMonth)
  
  return (years === 1 ? years + " Year left" : years > 1 ? years + " Years left" :months === 1  ? months + " Month left" : months > 1 ? months + " Months left" : date >= 2 ? date + ' Days left' : date === 1 ? date + "Day left"  : date  == 0 ? "Today" : "Late" ) 
}

function personAsingnerto(todo: Todo){
  const persons = todo.assignedTo.map(person =>{
    return `<div class="assigned">${person[0]}</div>`
  }) || "None"
  return persons
}

export const TodoCard = (todo: Todo) => {
  return `
    <div id="${todo.id}" class="todo-card" draggable="true"  ondragstart="drag(event)" ondragover="noAllowDrop(event)">
      <div class="todo-container">
        <div class="title">${todo.title[0].toUpperCase() + todo.title.slice(1)}</div>
        <div class="status">${todo.status[0].toUpperCase() + todo.status.slice(1)}</div>
        <div class="todo-info">
          <div class="due-date">
          ${getRemainingTime(todo)}</div>
        <div class="tags">${todo.tags.join(", ") || "None"}</div>
      </div>
      <div class="assigned-to">${personAsingnerto(todo)}</div>
        ${todo.notes ? `<div class="notes">${todo.notes}</div>` : ""}
        </div>
      <div class="todo-actions">
        <button class="edit-button" data-todo-id="${todo.id}">
            <img class="icon" src="../../public/opts.svg">
        </button>
        <button class="delete-button" data-todo-id="${todo.id}">
            <img class="icon" src="../../public/trash.svg">
        </button>
      </div>
    </div>
  `;
};

