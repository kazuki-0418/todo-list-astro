import { TodoContext } from "@contexts/todoContext";
import { TodoModalType } from "./todoModalType";

export const handleView = (todoId: string) => {
  const todoContext = TodoContext.getInstance();
  const todo = todoContext.getTodoById(todoId);

  function showModal(modalId: TodoModalType) {
    const modalControls = window.modalControls;
    if (!modalControls) {
      console.error("modalControls not found");
      return;
    }
    modalControls[modalId].show();
  }

  if (todo) {
    showModal(TodoModalType.VIEW);

    const viewTodoDetail = document.getElementById(
      "todoDetail",
    ) as HTMLDivElement;

    const todoTitle = viewTodoDetail.querySelector(
      "#todoTitle",
    ) as HTMLHeadingElement;
    if (todoTitle) {
      todoTitle.innerText = todo.title;
    }

    const todoStatus = viewTodoDetail.querySelector(
      "#todoStatus",
    ) as HTMLParagraphElement;
    if (todoStatus) {
      todoStatus.innerText = todo.status;
    }

    const todoDueDate = viewTodoDetail.querySelector(
      "#todoDueDate",
    ) as HTMLParagraphElement;
    if (todoDueDate) {
      const renderDuedate = (dueDate: string) => {
        const date = new Date(dueDate);

        if (
          (date.getUTCFullYear() === 1970 &&
            date.getUTCMonth() === 0 &&
            date.getUTCDate() === 1 &&
            date.getUTCHours() === 0 &&
            date.getUTCMinutes() === 0 &&
            date.getUTCSeconds() === 0 &&
            date.getUTCMilliseconds() === 0) ||
          isNaN(date.getTime())
        ) {
          return "--:--:--";
        }
        date.setDate(date.getDate() + 1);
        return date.toDateString();
      };

      todoDueDate.innerText = renderDuedate(todo.due_date);
    }

    const todoTags = viewTodoDetail.querySelector(
      "#todoTags",
    ) as HTMLParagraphElement;

    if (todoTags) {
      todoTags.innerText = todo.tags.join(", ") || "None";
    }

    const todoAssignedTo = viewTodoDetail.querySelector(
      "#todoAssignees",
    ) as HTMLParagraphElement;
    if (todoAssignedTo) {
      todoAssignedTo.innerText = todo.assigned_to.join(", ") || "None";
    }

    const todoNotes = viewTodoDetail.querySelector(
      "#todoNotes",
    ) as HTMLParagraphElement;
    if (todoNotes) {
      todoNotes.innerText = todo.notes || "";
    }

    const todoCreatedAt = viewTodoDetail.querySelector(
      "#todoCreatedAt",
    ) as HTMLParagraphElement;

    if (todoCreatedAt) {
      todoCreatedAt.innerText = `Created At:${new Date(
        todo.created_at,
      ).toLocaleDateString()}`;
    }

    const todoUpdatedAt = viewTodoDetail.querySelector(
      "#todoUpdatedAt",
    ) as HTMLParagraphElement;

    if (todoUpdatedAt) {
      todoUpdatedAt.innerText = `Updated At:${new Date(todo.updated_at).toLocaleDateString()}`;
    }
  }
};
