export type Task = {
  id: number;
  title: string;
  due_date: string;
  project_id: number;
  projects: { name: string }[];
};

export type Meeting = {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
};

export type TaskWithProject = Task;
