import { handleDelete } from "@utils/handleDelete";
import { handleEdit } from "@utils/handleEdit";
import { handleView } from "@utils/handleView";
import type { Todo } from "src/types/todo";

export function addEventListeners(todoList: HTMLElement | null) {
  if (!todoList) return;
  const editButtons = todoList.querySelectorAll(".edit-button");
  const deleteButtons = todoList.querySelectorAll(".delete-button");
  const viewButtons = todoList.querySelectorAll(".todo-card");

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

export const TodoCard = (todo: Todo) => {
  return `
    <div class="todo-card"  data-todo-id="${todo.id}">
      <div class="todo-container">
        <div class="title">${todo.title}</div>
        <div class="status">${todo.status}</div>
        <div class="due-date">${new Date(
          todo.dueDate,
        ).toLocaleDateString()}</div>
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
