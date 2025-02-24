import type { Todo } from "src/types/todo";

export const TodoCard = (todo: Todo) => {
  return `
    <div class="todo-card">
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
