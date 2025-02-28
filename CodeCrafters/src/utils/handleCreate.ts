import { TodoModalType } from "./todoModalType";
import { TodoFormType } from "./todoFormType";
import type { Status } from "src/types/todo";

export const handleCreate = (status: Status) => {
  function showModal(modalId: string) {
    const modalControls = window.modalControls;
    if (!modalControls) {
      console.error("modalControls not found");
      return;
    }
    modalControls[modalId].show();
  }

  showModal(TodoModalType.CREATE);

  const addTodoForm = document.getElementById(
    TodoFormType.ADD,
  ) as HTMLFormElement;

  const statusInput = addTodoForm.querySelector(
    '[name="status"]',
  ) as HTMLInputElement;

  const statusSelectBox = addTodoForm.querySelector(
    "#select-box-status",
  ) as HTMLDivElement;

  if (statusInput && statusSelectBox) {
    statusInput.value = status;

    const selectedOption = addTodoForm.querySelector(
      `.option[data-value="${status}"]`,
    ) as HTMLElement;

    if (selectedOption) {
      statusSelectBox.textContent = selectedOption.dataset.label as string;
    }
  }

  const dueDateInput = addTodoForm.querySelector(
    '[name="dueDate"]',
  ) as HTMLInputElement;

  const today = new Date();
  today.setDate(today.getDate());
  const formattedDate = today.toISOString().split("T")[0];
  dueDateInput.value = formattedDate;
};
