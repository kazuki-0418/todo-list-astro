import { handleDelete } from "@utils/handleDelete";
import { handleEdit } from "@utils/handleEdit";
import { handleView } from "@utils/handleView";
import type { Todo } from "src/types/todo";

export function addEventListeners(todoList: HTMLElement | null) {
  if (!todoList) return;
  const editButtons = todoList.querySelectorAll(".edit-button");
  const deleteButtons = todoList.querySelectorAll(".delete-button");
  const viewButtons = todoList.querySelectorAll(".todo-container");

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

  viewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const todoId = (e.currentTarget as HTMLElement).dataset.todoId;
      if (todoId) {
        handleView(todoId);
      }
    });
  });
}

const renderDuedate = (dueDate: string) => {
  const date = new Date(dueDate);

  if (
    isNaN(date.getTime()) ||
    (date.getUTCFullYear() === 1970 &&
      date.getUTCMonth() === 0 &&
      date.getUTCDate() === 1 &&
      date.getUTCHours() === 0 &&
      date.getUTCMinutes() === 0 &&
      date.getUTCSeconds() === 0 &&
      date.getUTCMilliseconds() === 0)
  ) {
    return "--:--:--";
  }

  return date.toDateString();
};

export const TodoCard = (todo: Todo) => {
  return `
    <div id="${todo.id}" class="todo-card" draggable="true"  ondragstart="drag(event)" ondragover="noAllowDrop(event)">
      <div class="todo-container" id="${todo.id}" data-todo-id="${todo.id}">
        <div class="title">${todo.title}</div>
        <div class="status">${todo.status}</div>
        <div class="due-date">${renderDuedate(todo.dueDate)}</div>
        <div class="tags">${todo.tags.join(", ") || "None"}</div>
        <div class="assigned-to">${todo.assignedTo.join(", ") || "None"}</div>
        ${todo.notes ? `<div class="notes">${todo.notes}</div>` : ""}
      </div>
      <div class="todo-actions">
        <button class="edit-button" data-todo-id="${todo.id}">Edit</button>
        <button class="delete-button" data-todo-id="${todo.id}">Delete</button>
      </div>
    </div>
  `;
};
