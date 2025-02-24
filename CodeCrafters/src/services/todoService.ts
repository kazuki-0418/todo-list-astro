import { TodoContext } from "@contexts/todoContext";
import type { Todo } from "../types/todo";

export class TodoService {
  private todoContext: TodoContext;
  private storageKey = "todos"; // Key for localStorage

  constructor() {
    this.todoContext = TodoContext.getInstance();
    this.loadTodosFromStorage();
  }

  /** Load data from localStorage and sync with Context */
  private loadTodosFromStorage(): void {
    const storedTodos = localStorage.getItem(this.storageKey);
    if (storedTodos) {
      const todos: Todo[] = JSON.parse(storedTodos).map((todo: Todo) => ({
        ...todo,
        dueDate: new Date(todo.dueDate),
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
      this.todoContext.setTodos(todos);
    }
  }

  /** Save data to localStorage */
  private saveTodosToStorage(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  /** Retrieve Todos */
  getTodos(): Todo[] {
    return this.todoContext.getTodos();
  }

  /** Add a new Todo */
  addTodo(todo: Omit<Todo, "createdAt" | "updatedAt">): Todo[] {
    const newTodo: Todo = {
      ...todo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedTodos = [...this.todoContext.getTodos(), newTodo];

    this.todoContext.setTodos(updatedTodos);
    this.saveTodosToStorage(updatedTodos);
    this.notifyUpdate();

    return updatedTodos;
  }

  /** Toggle status of a Todo */
  toggleTodoStatus(title: string, newStatus: Todo["status"]): Todo[] {
    const updatedTodos = this.todoContext
      .getTodos()
      .map((todo) =>
        todo.title === title
          ? { ...todo, status: newStatus, updatedAt: new Date() }
          : todo,
      );

    this.todoContext.setTodos(updatedTodos);
    this.saveTodosToStorage(updatedTodos);
    this.notifyUpdate();

    return updatedTodos;
  }

  /** Delete a Todo */
  deleteTodo(title: string): Todo[] {
    const updatedTodos = this.todoContext
      .getTodos()
      .filter((todo) => todo.title !== title);

    this.todoContext.setTodos(updatedTodos);
    this.saveTodosToStorage(updatedTodos);
    this.notifyUpdate();
    return updatedTodos;
  }

  private notifyUpdate() {
    // カスタムイベントをディスパッチ
    const event = new CustomEvent("todosUpdated");
    document.dispatchEvent(event);
  }
}
