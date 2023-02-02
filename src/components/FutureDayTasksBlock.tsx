import { useState, FC } from 'react';

import moment from 'moment';

import Checkbox from '@mui/material/Checkbox';
import { TaskBlock } from '../components/TaskBlock';
import { ITask } from "../utils/interfaces";

interface IFutureDayTasksBlock {
  tasks: ITask[],
  date: string | null,
  updateShowForm: (status: boolean) => void;
}

export const FutureDayTasksBlock: FC<IFutureDayTasksBlock> = ({ tasks, date, updateShowForm }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const tomorrow = () => {
    const tomorrow  = moment().add(1,'days').format('MM/DD/YYYY');

    return date === tomorrow
      ? 'Tomorrow'
      : moment(date).format('DD/MM')
  };

  return (
    <div className="future_day_tasks_block shadow">
    <div className="future_day_tasks_block_title">
      <div className='task_color_block' style={{ background: '#A9A9A9' }}/>
      <div className='future_day_tasks_block_title_text'>{tomorrow()} Tasks</div>
      <Checkbox
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
        sx={{
          color: '#F4F4F4',
          '&.Mui-checked': { color: '#F4F4F4' },
        }}
      />
    </div>
    {isOpen ? <div className='future_day_tasks_block_data'>
      {
        tasks.map((task: ITask) => <TaskBlock
          key={task.id}
          task={task}
          updateShowForm={updateShowForm}
        />)
      }
    </div> : null}
    </div>
  )
}