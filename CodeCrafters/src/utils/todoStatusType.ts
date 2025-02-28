export enum TodoStatusType {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
  CANCELLED = "cancelled",
}

export const todoStatusTypeOptions = [
  { value: TodoStatusType.TODO, label: "To Do" },
  { value: TodoStatusType.IN_PROGRESS, label: "In Progress" },
  { value: TodoStatusType.DONE, label: "Done" },
];
