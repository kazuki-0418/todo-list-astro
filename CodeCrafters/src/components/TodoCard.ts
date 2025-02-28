import { handleDelete } from "@utils/handleDelete";
import { handleEdit } from "@utils/handleEdit";
import { handleView } from "@utils/handleView";
import type { Todo } from "src/types/todo";
import editIcon from "@assets/edit.svg";
import deleteIcon from "@assets/delete.svg";
import { profileIcons } from "@utils/propfileIcons";
import { todoStatusTypeOptions } from "@utils/todoStatusType";

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

function getRemainingTime(todo: Todo) {
  if (todo.status === "done") return "Completed";
  const dueDate = new Date(todo.due_date);
  if (
    (dueDate.getUTCFullYear() === 1970 &&
      dueDate.getUTCMonth() === 0 &&
      dueDate.getUTCDate() === 1 &&
      dueDate.getUTCHours() === 0 &&
      dueDate.getUTCMinutes() === 0 &&
      dueDate.getUTCSeconds() === 0 &&
      dueDate.getUTCMilliseconds() === 0) ||
    todo.due_date == ""
  )
    return "--:--:--";

  const date = Math.round(
    (dueDate.getTime() - new Date().getTime()) / 86400000,
  );
  const daysInaMonth = 30;
  const monthsInaYear = 12;
  const years = Math.floor(date / daysInaMonth / monthsInaYear);
  const months = Math.floor(date / daysInaMonth);

  return years === 1
    ? years + " Year left"
    : years > 1
      ? years + " Years left"
      : months === 1
        ? months + " Month left"
        : months > 1
          ? months + " Months left"
          : date >= 2
            ? date + " Days left"
            : date === 1
              ? date + "Day left"
              : date == 0
                ? "Today"
                : "Overdue by " + Math.abs(date) + " Days";
}

function renderAssignedTo(todo: Todo) {
  type ProfileIconKeys = keyof typeof profileIcons;
  const assignedPeople = todo.assigned_to.filter(
    (person): person is ProfileIconKeys => {
      return person in profileIcons;
    },
  );

  const persons =
    assignedPeople.map((person: ProfileIconKeys, index: number) => {
      return index > 0
        ? `<img class="assigned joint" src="${profileIcons[person]}">`
        : `<img class="assigned" src="${profileIcons[person]}">`;
    }) || "None";

  return persons.join("");
}

function renderTags(tags: string[]) {
  return tags
    .map((tag) => {
      const styles: Record<string, string> = {
        backend: "backend-badge",
        frontend: "frontend-badge",
        "desktop-design": "desktop-design-badge",
        "mobile-design": "mobile-design-badge",
      };

      return styles[tag]
        ? `<div class="tag ${styles[tag]}">${
            tag[0].toUpperCase() + tag.slice(1)
          }</div>`
        : null;
    })
    .filter(Boolean)
    .join("");
}

export const TodoCard = (todo: Todo) => {
  return `
    <div id="${todo.id}" class="todo-card" draggable="true"  ondragstart="drag(event)" ondragover="noAllowDrop(event)">
      <div class="todo-container" id="${todo.id}" data-todo-id="${todo.id}">
        <div class="title">${todo.title[0].toUpperCase() + todo.title.slice(1)}</div>
        <div class="status">${
          todoStatusTypeOptions.find((option) => option.value === todo.status)
            ?.label
        }</div>
        <div class="todo-info">
          <div class="tags">${renderTags(todo.tags)}</div>
        </div>
        <div class="assigned-to">${renderAssignedTo(todo)}</div>
        ${todo.notes ? `<div class="notes">${todo.notes}</div>` : ""}
        <div class="due-date">${getRemainingTime(todo)}</div>
      </div>
        <div class="todo-actions">
        <button class="edit-button" data-todo-id="${todo.id}">
            <img class="icon" src="${editIcon.src}">
        </button>
        <button class="delete-button" data-todo-id="${todo.id}">
            <img class="icon" src="${deleteIcon.src}">
        </button>
      </div>
    </div>
  `;
};
