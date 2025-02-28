import { fetchTodos } from "@services/todoApi";
import type { Todo } from "src/types/todo";

export class TodoContext {
  private static instance: TodoContext;
  private todos: Todo[] = [];
  private listeners: (() => void)[] = [];

  private constructor() {
    this.loadTodosFromDatabase(); // 🔹 Load existing data from database when initializing
  }

  /** 🔹 Get the singleton instance */
  static getInstance(): TodoContext {
    if (!TodoContext.instance) {
      TodoContext.instance = new TodoContext();
    }
    return TodoContext.instance;
  }

  /** 🔹 Load todos from Database */
  async loadTodosFromDatabase(): Promise<void> {
    try {
      const todos = await fetchTodos();
      console.log("Loaded todos from database:", todos);
      this.todos = todos;
      this.notifyListeners();
    } catch (error) {
      console.error("Error loading todos from database:", error);
    }
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  /** 🔹 Get all todos (always returns the latest stored data) */
  getTodos(): Todo[] {
    return this.todos;
  }

  /** 🔹 Set todos and update local cache */
  setTodos(todos: Todo[]): void {
    this.todos = todos;
    this.notifyListeners();
  }

  /** 🔹 Subscribe to changes */
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /** 🔹 Notify all listeners of changes */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}
