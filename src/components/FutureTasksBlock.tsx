import { FC } from 'react';

import { FutureDayTasksBlock } from '../components/FutureDayTasksBlock';
import { ITask } from "../utils/interfaces"

interface IFutureTasksBlock {
  updateShowForm: (status: boolean) => void;
  tasks: ITask[]
}
interface ISortedItem {
  date: string | null; tasks: ITask[];
}

export const FutureTasksBlock: FC<IFutureTasksBlock> = ({ tasks, updateShowForm }) => {
  const sortedTasks = () => {
    let sortedList: ISortedItem[] = [];

    tasks.forEach(task => {
      const dateExist = sortedList.find(({ date }) => date === task.date);

      if (dateExist) {
        sortedList = sortedList.map(item => {
          return item.date === task.date
            ? { ...item, tasks: [...item.tasks, task] }
            : item
        })
      } else {
        sortedList = [ ...sortedList, { date: task.date, tasks: [task]}]
      }
    })

    return sortedList;
  }


  return <div className='future_day_tasks'>{sortedTasks().map(({ tasks, date }, intex) => 
    <FutureDayTasksBlock key={intex} tasks={tasks} date={date} updateShowForm={updateShowForm} />)}</div>
}