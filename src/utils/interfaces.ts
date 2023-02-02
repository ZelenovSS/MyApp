export interface ITaskUpdate {
  id: string,
  field: string,
  value: string | boolean
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  date: string | null;
  checked: boolean
}
