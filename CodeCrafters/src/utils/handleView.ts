import { TodoContext } from "@contexts/todoContext";

export const handleView = (todoId: string) => {
  const todoContext = TodoContext.getInstance();
  const todo = todoContext.getTodoById(todoId);

  function showModal(modalId: string) {
    const modalControls = window.modalControls;
    if (!modalControls) {
      console.error("modalControls not found");
      return;
    }
    modalControls[modalId].show();
  }

  if (todo) {
    showModal("view-todo-modal");

    const viewTodoDetail = document.querySelector(
      "todo-detail-container",
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
      todoDueDate.innerText = new Date(todo.dueDate).toLocaleDateString();
    }

    const todoTags = viewTodoDetail.querySelector(
      "#todoTags",
    ) as HTMLParagraphElement;

    if (todoTags) {
      todoTags.innerText = todo.tags.join(", ") || "None";
    }

    const todoAssignedTo = viewTodoDetail.querySelector(
      "#todoAssignedTo",
    ) as HTMLParagraphElement;
    if (todoAssignedTo) {
      todoAssignedTo.innerText = todo.assignedTo.join(", ") || "None";
    }

    const todoNotes = viewTodoDetail.querySelector(
      "#todoNotes",
    ) as HTMLParagraphElement;
    if (todoNotes) {
      todoNotes.innerText = todo.notes || "None";
    }

    const todoCreatedAt = viewTodoDetail.querySelector(
      "#todoCreatedAt",
    ) as HTMLParagraphElement;

    if (todoCreatedAt) {
      todoCreatedAt.innerText = new Date(todo.createdAt).toLocaleDateString();
    }

    const todoUpdatedAt = viewTodoDetail.querySelector(
      "#todoUpdatedAt",
    ) as HTMLParagraphElement;

    if (todoUpdatedAt) {
      todoUpdatedAt.innerText = new Date(todo.updatedAt).toLocaleDateString();
    }
  }
};
