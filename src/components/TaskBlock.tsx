import { FC } from 'react';

import classNames from 'classnames';

import { useTasks } from '../hooks/useTasks';
import { useForm } from '../hooks/useForm';
import { CustomSwitcher } from '../components/CustomSwitcher';
import { getRundomColor } from '../utils';
import { ITask } from '../utils/interfaces';

interface ITaskBlock {
  task: ITask;
  updateShowForm: (status: boolean) => void;

}

export const TaskBlock:FC<ITaskBlock> = ({ task, updateShowForm }) => {
  const { updateTask } = useTasks();
  const { resetFormData, setFormData } = useForm();

  const handleTashClick = () => {
    setFormData(task);
    updateShowForm(true);
  };

  const handleStatusChange = (status: boolean) => {
    updateTask(
      {
        ...task,
        checked: status
      },
    );
    resetFormData();
  };

  return (
    <div className='task'>
      <div className='task_color_block' style={{ background: getRundomColor() }}/>
      <div className='task_data'>
        <div
          className={classNames('task_data_title', {'completed': task.checked})}
          onClick={handleTashClick}
        >{task.title}</div>
        <div className='task_data_description'>{task.description}</div>
    </div>
    <CustomSwitcher status={task.checked} handleStatusChange={handleStatusChange} />
    </div>
  )
};
