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

export const STAFF_OPTIONS = ["山田", "佐藤", "未割り当て"];