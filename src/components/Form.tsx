import { FC, ChangeEvent } from 'react';

import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { formattedDate } from '../utils';
import { useTasks } from '../hooks/useTasks';
import { useForm } from '../hooks/useForm';


interface IForm {
  updateShowForm: (status: boolean) => void;
}

export const Form: FC<IForm> = ({ updateShowForm }) => {
  const { formData, updateFormData, resetFormData } = useForm();
  const { taskList, addNewTask, updateTask, deleteTask } = useTasks();
  const taskUpdate = taskList.find(({ id }) => id === formData.id);

  const handleSubmit = (e: any) => {
    if (e.target.id === 'submit') {
      taskUpdate ? updateTask(formData) : addNewTask(formData);
    }
    if (e.target.id === 'delete') {
      deleteTask(formData.id);
    }
    resetFormData();
    updateShowForm(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    updateFormData(field, e.target.value)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="form">
        <div className='form_body'>
          <div className='form_header'>Enter task data</div>
          <Input
            className='form_field'
            value={formData.title}
            name='Task title'
            placeholder='Task name'
            required
            onChange={(e) => handleChange(e, 'title')}
          />
          <Input
            className='form_field'
            value={formData.description}
            id='description'
            name='Task description'
            placeholder='Task description'
            onChange={(e) => handleChange(e, 'description')}
          />
          <DesktopDatePicker
            className='form_field'
            label="Task date"
            inputFormat="MM/DD/YYYY"
            value={formData.date}
            minDate={Date.now()}
            onChange={(date) => updateFormData(
              'date', formattedDate(date)
            )}
            renderInput={(params) => <TextField {...params} />}
          />
          <span className='form_button_block'>
            {taskUpdate ? <Button
              id='delete'
              onClick={handleSubmit}
              variant="contained"
              color="warning"
              size='small'
            >Delete</Button>: null}
            <Button
              id='submit'
              onClick={handleSubmit}
              disabled={!formData.title}
              variant="contained"
              color="success"
              size='small'
            >{`${taskUpdate ? 'Edit' : 'Submit'}`}</Button>
            <Button
              onClick={handleSubmit}
              variant="outlined"
              color="error"
              size='small'
            >Cancel</Button>
          </span>
        </div>
      </div>
    </LocalizationProvider>
  )
};
