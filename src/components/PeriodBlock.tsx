import { FC, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';

import { DayBlock } from '../components/DayBlock';
import { ITask } from '../utils/interfaces';

interface IPeriodBlock {
  title: string,
  tasks: ITask[],
  updateShowForm: (status: boolean) => void;
  open?: boolean
};

export const PeriodBlock: FC<IPeriodBlock> = ({ title, tasks, updateShowForm, open = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  if (!tasks.length) return null;

  return (
    <div className='period_block'>
      <div className='period_block_header'><Checkbox
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
        sx={{
          color: '#F4F4F4',
          '&.Mui-checked': { color: '#F4F4F4' },
        }}
      />
    {`${title} Tasks`}</div>
    {isOpen ? <div className='period_block_tasks shadow'>
      <DayBlock
        tasksForDay={tasks}
        updateShowForm={updateShowForm}
      />
    </div> : null}
  </div>
  )
};
