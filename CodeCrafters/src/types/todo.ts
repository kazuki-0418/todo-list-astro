export type Status = "todo" | "in-progress" | "done" | "cancelled";

export type Todo = {
  id: string;
  title: string;
  status: Status;
  dueDate: string; // Format: "YYYY-MM-DD"
  createdAt: Date; // Automatically set when a new Todo is created
  updatedAt: Date; // Automatically set when a Todo is updated
  tags: string[];
  assignedTo: string[];
  notes?: string; // You can leave additional information.
};
