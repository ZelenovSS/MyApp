import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { formattedDate } from '../utils';

import { ITask } from '../utils/interfaces';

interface ITasksState {
  taskList: ITask[],
  addNewTask: (formData: ITask) => void,
  updateTask: (data: ITask) => void,
  deleteTask: (taskId: string) => void
}

export const useTasks = create<ITasksState>() (
  devtools(
    persist(
      (set) => ({
        taskList: [
          {
            checked: false,
            date: formattedDate(),
            description: "Lorem Ipsum Dolor Sit met...",
            id: "1",
            title: "Visit David"
          },
          {
            checked: false,
            date: formattedDate(),
            description: "Lorem Ipsum Dolor Sit met...",
            id: "2",
            title: "Goceries For Dinner"
          },
          {
            checked: true,
            date: formattedDate(),
            description: "Lorem Ipsum Dolor Sit met...",
            id: "3",
            title: "Fix Dad’s iPad"
          },
        ],
        addNewTask: (formData) => set(({ taskList }) => ({ taskList: [...taskList, {...formData}] })
        ),
        deleteTask: (taskId) => set(({ taskList }) => ({ taskList: taskList.filter(({ id }) => id !== taskId)})),
        updateTask: (data) => set(({ taskList }) => ({ taskList: taskList.map (task => task.id === data.id ? data : task) }))
      }),
      {
        name: 'tasks-storage'
      }
    )
  )
);
