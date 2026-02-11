export type Project = {
  id: number;
  name: string;
  assignee: string;
  status: string;
  description: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  name: string;
  assignee: string;
  status: string;
}