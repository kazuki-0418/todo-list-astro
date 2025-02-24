import type { Todo } from "src/types/todo";

export class TodoContext {
  private static instance: TodoContext;
  private todos: Todo[] = [];
  private storageKey = "todos"; // Key for localStorage

  private constructor() {
    this.loadTodosFromStorage(); // 🔹 Load existing data when initializing
  }

  /** 🔹 Get the singleton instance */
  static getInstance(): TodoContext {
    if (!TodoContext.instance) {
      TodoContext.instance = new TodoContext();
    }
    return TodoContext.instance;
  }

  /** 🔹 Load todos from localStorage */
  private loadTodosFromStorage(): void {
    const storedTodos = localStorage.getItem(this.storageKey);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  /** 🔹 Save todos to localStorage */
  private saveTodosToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  /** 🔹 Get all todos (always returns the latest stored data) */
  getTodos(): Todo[] {
    return this.todos;
  }

  /** 🔹 Set todos and persist to localStorage */
  setTodos(todos: Todo[]): void {
    this.todos = todos;
    this.saveTodosToStorage();
  }
}
