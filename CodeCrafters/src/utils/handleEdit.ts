import { TodoContext } from "@contexts/todoContext";

export const handleEdit = (todoId: string) => {
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
    showModal("update-todo-modal");

    const updateTodoForm = document.getElementById(
      "update-todo-form",
    ) as HTMLFormElement;

    const idInput = updateTodoForm.querySelector(
      "#todo-id",
    ) as HTMLInputElement;
    if (idInput) {
      idInput.value = todo.id;
    }
    const titleInput = updateTodoForm.querySelector(
      '[name="title"]',
    ) as HTMLInputElement;
    if (titleInput) titleInput.value = todo.title;
    const dueDateInput = updateTodoForm.querySelector(
      '[name="dueDate"]',
    ) as HTMLInputElement;

    const date = new Date(todo.dueDate);
    date.setDate(date.getDate() - 1);
    const formattedDate = date.toISOString().split("T")[0];
    dueDateInput.value = formattedDate;

    if (todo.tags) {
      todo.tags.forEach((tag) => {
        const checkbox = updateTodoForm.querySelector(
          `[data-checkbox][value="${tag}"]`,
        ) as HTMLInputElement;

        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
    }

    if (todo.assignedTo) {
      todo.assignedTo.forEach((assignee) => {
        const checkbox = updateTodoForm.querySelector(
          `[data-checkbox][value="${assignee}"]`,
        ) as HTMLInputElement;

        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
    }
    const statusInput = updateTodoForm.querySelector(
      '[name="status"]',
    ) as HTMLInputElement;

    const statusSelectBox = updateTodoForm.querySelector(
      "#select-box-status",
    ) as HTMLDivElement;

    if (statusInput && statusSelectBox) {
      statusInput.value = todo.status;

      const selectedOption = updateTodoForm.querySelector(
        `.option[data-value="${todo.status}"]`,
      ) as HTMLElement;

      if (selectedOption) {
        statusSelectBox.textContent = selectedOption.dataset.label as string;
      }
    }
  }
};
