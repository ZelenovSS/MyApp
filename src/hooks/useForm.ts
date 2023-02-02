import { v4 } from 'uuid';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

import { formattedDate } from '../utils';
import { ITask } from '../utils/interfaces';

const defaultFormData = {
  title: '',
  description: '',
  checked: false,
  date: formattedDate()
};

interface IFormState {
  formData: ITask,
  setFormData: (data: ITask) => void,
  updateFormData: (field: string, value: string) => void,
  resetFormData: () => void
};

export const useForm = create<IFormState>() (
  devtools(
    persist(
      (set) => ({
        formData: {...defaultFormData, id: v4()},
        setFormData: (data) => set(() => ({ formData: data })),
        updateFormData: (field: string, value: string) => set(({ formData }) => ({
          formData: {...formData, [field]: value}
        })),
        resetFormData: () => set(() => ({ formData: {...defaultFormData, id: v4()} }))      
      }),
      {
        name: 'task-form-storage',
      }
    )
  )
);
