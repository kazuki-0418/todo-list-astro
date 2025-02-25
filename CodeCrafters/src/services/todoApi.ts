import { supabase } from "../utils/supabaseClient";
import type { Todo } from "../types/todo";

export async function fetchTodos(): Promise<Todo[]> {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error("Error fetching todos:", error.message);
    return [];
  }
  return data || [];
}

export async function addTodo(newTodo: Partial<Todo>): Promise<Todo | null> {
  const { data, error } = await supabase
    .from("todos")
    .insert(newTodo)
    .select()
    .single();
  if (error) {
    console.error("Error adding todo:", error.message);
    return null;
  }
  return data;
}

export async function updateTodo(
  id: string,
  updates: Partial<Todo>,
): Promise<boolean> {
  const { error } = await supabase.from("todos").update(updates).eq("id", id);
  if (error) {
    console.error("Error updating todo:", error.message);
    return false;
  }
  return true;
}

export async function deleteTodo(id: string): Promise<boolean> {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    console.error("Error deleting todo:", error.message);
    return false;
  }
  return true;
}
