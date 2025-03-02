import type { Todo } from "src/types/todo";
import { TodoContext } from "@contexts/todoContext";
import { handleView } from "@utils/handleView";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;
  const resultsContainer = document.getElementById(
    "autocomplete-results",
  ) as HTMLUListElement;

  searchInput.addEventListener("input", () => {
    const todoContext = TodoContext.getInstance();
    const todos: Todo[] = todoContext.getTodos();
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";
    resultsContainer.style.display = query ? "block" : "none";

    if (query) {
      const filteredTodos = todos.filter((item) =>
        item.title.toLowerCase().includes(query),
      );

      filteredTodos.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.title;
        li.classList.add("autocomplete-item");

        li.addEventListener("click", () => {
          searchInput.value = item.title;
          resultsContainer.style.display = "none";
          resultsContainer.innerHTML = "";
          handleView(item.id);
        });

        resultsContainer.appendChild(li);
      });
    }
  });
});
