import { TodoContext } from "@contexts/todoContext";

export const handleDelete = (todoId: string) => {
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
    showModal("delete-todo-modal");

    const deleteTodoForm = document.getElementById(
      "delete-todo-form",
    ) as HTMLFormElement;

    const idInput = deleteTodoForm.querySelector(
      "#todo-id",
    ) as HTMLInputElement;
    if (idInput) {
      idInput.value = todo.id;
    }
    const todoTypography = deleteTodoForm.querySelector(
      "#todo-title",
    ) as HTMLInputElement;

    const todoTitle = todo.title;
    if (todoTypography) {
      todoTypography.innerText = todoTitle;
    }
  }
};
