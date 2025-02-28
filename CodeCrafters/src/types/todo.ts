export type Status = "todo" | "in-progress" | "done" | "cancelled";

export type Todo = {
  id: string;
  title: string;
  status: Status;
  due_date: string; // Format: "YYYY-MM-DD"
  created_at: Date; // Automatically set when a new Todo is created
  updated_at: Date; // Automatically set when a Todo is updated
  tags: string[];
  assigned_to: string[];
  notes?: string; // You can leave additional information.
};
