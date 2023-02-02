import { FC, useEffect, useRef } from 'react';

import AddIcon from '@mui/icons-material/Add';

import { CustomSwitcher } from '../components/CustomSwitcher';

interface IMenu {
  showNews: boolean;
  updateShowNews: (status: boolean) => void;
  updateShowMenu: (status: boolean) => void;
  updateShowForm: (status: boolean) => void;
}

export const Menu:FC<IMenu> = ({ showNews, updateShowNews, updateShowMenu, updateShowForm }) => {
  const menuRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hander = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        updateShowMenu(false);
      };
    };
    document.addEventListener('mousedown', hander);

    return () => {
      document.removeEventListener('mousedown', hander);
    }
  });

  const openTaskForm = () => {
    updateShowMenu(false);
    updateShowForm(true);
  };

  return <div className='menu' ref={menuRef}>
    <div className='add_button'>Add new task <AddIcon fontSize='large' onClick={openTaskForm} style={{ cursor: 'pointer' }}/></div>
    <div className='toggle_news_button'>{`${showNews ? 'Show' : 'Hide'} news string`} <CustomSwitcher status={showNews} handleStatusChange={updateShowNews} /></div>
  </div>
};
