import { FC } from 'react';

import { TaskBlock } from '../components/TaskBlock';
import { ITask } from "../utils/interfaces"

interface IDayBlock {
  tasksForDay: ITask[];
  updateShowForm: (status: boolean) => void;
}

export const DayBlock: FC<IDayBlock> = ({ tasksForDay, updateShowForm }) => {
  return (
    <div className='day_block'>
    {
      tasksForDay.map(task => <TaskBlock
        key={task.id}
        task={task}
        updateShowForm={updateShowForm}
      />)
    }
    </div>
  )
}