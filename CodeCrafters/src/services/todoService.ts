import { TodoContext } from "@contexts/todoContext";
import {
  fetchTodos,
  addTodo as apiAddTodo,
  updateTodo as apiUpdateTodo,
  updateTodoStatus as apiUpdateTodoStatus,
  deleteTodo as apiDeleteTodo,
} from "@services/todoApi";
import type { Todo } from "src/types/todo";

export class TodoService {
  private todoContext: TodoContext;

  constructor() {
    this.todoContext = TodoContext.getInstance();
  }

  /** Refresh data from the database */
  async refreshTodos(): Promise<Todo[]> {
    try {
      const todos = await fetchTodos();
      this.todoContext.setTodos(todos);
      return todos;
    } catch (error) {
      console.error("Error refreshing todos:", error);
      return this.todoContext.getTodos(); // Return cached data if refresh fails
    }
  }

  /** Retrieve Todos */
  getTodos(): Todo[] {
    return this.todoContext.getTodos();
  }

  /** Add a new Todo */
  async addTodo(
    todo: Omit<Todo, "id" | "created_at" | "updated_at">,
  ): Promise<Todo[]> {
    try {
      // Prepare the new todo with dates
      const newTodoData: Partial<Todo> = {
        ...todo,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Add to database
      const addedTodo = await apiAddTodo(newTodoData);

      if (addedTodo) {
        // Update local cache with the returned todo that includes the ID
        const updatedTodos = [...this.todoContext.getTodos(), addedTodo];
        this.todoContext.setTodos(updatedTodos);
      }

      // Refresh from database to ensure consistency
      return this.refreshTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
      return this.todoContext.getTodos();
    }
  }

  /** Update a Todo */
  async updateTodo(todo: Pick<Todo, "id"> & Partial<Todo>): Promise<Todo[]> {
    try {
      // Update the todo with current date
      const updateData: Partial<Todo> = {
        ...todo,
        updated_at: new Date(),
      };

      // Update in database
      const success = await apiUpdateTodo(todo.id, updateData);

      if (success) {
        // Update local cache
        const updatedTodos = this.todoContext
          .getTodos()
          .map((t) => (t.id === todo.id ? { ...t, ...updateData } : t));
        this.todoContext.setTodos(updatedTodos);
      }

      // Refresh from database to ensure consistency
      return this.refreshTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
      return this.todoContext.getTodos();
    }
  }

  /** Toggle status of a Todo */
  async toggleTodoStatus(
    id: string,
    newStatus: Todo["status"],
  ): Promise<Todo[]> {
    try {
      // Update status in database
      const success = await apiUpdateTodoStatus(id, newStatus);

      if (success) {
        // Update local cache
        const updatedTodos = this.todoContext
          .getTodos()
          .map((todo) =>
            todo.id === id
              ? { ...todo, status: newStatus, updatedAt: new Date() }
              : todo,
          );
        this.todoContext.setTodos(updatedTodos);
      }

      // Refresh from database to ensure consistency
      return this.refreshTodos();
    } catch (error) {
      console.error("Error toggling todo status:", error);
      return this.todoContext.getTodos();
    }
  }

  /** Delete a Todo */
  async deleteTodo(id: string): Promise<Todo[]> {
    try {
      // Delete from database
      const success = await apiDeleteTodo(id);

      if (success) {
        // Update local cache
        const updatedTodos = this.todoContext
          .getTodos()
          .filter((todo) => todo.id !== id);
        this.todoContext.setTodos(updatedTodos);
      }

      // Refresh from database to ensure consistency
      return this.refreshTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
      return this.todoContext.getTodos();
    }
  }

  /** Subscribe to todo updates */
  subscribe(callback: () => void): () => void {
    return this.todoContext.subscribe(callback);
  }
}
