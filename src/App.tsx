import { useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';

import moment from 'moment';
import { useTasks } from './hooks/useTasks';
import { Menu } from './components/Menu'
import { Form } from './components/Form';
import { NewsBlock } from './components/NewsBlock';
import { FutureTasksBlock } from './components/FutureTasksBlock';
import { PeriodBlock } from './components/PeriodBlock';
import { formattedDate } from './utils';

import './App.css';
import { ITask } from './utils/interfaces';

interface ISortedTasks {
  current: ITask[],
  future: ITask[],
  past: ITask[]
}

const App = () => {
  const { taskList } = useTasks();
  const [showMenu, updateShowMenu] = useState<boolean>(false);
  const [showNews, updateShowNews] = useState<boolean>(true);
  const [showForm, updateShowForm] = useState<boolean>(false);

  console.log('taskList', formattedDate());

  const sortTasks: () => ISortedTasks = () => {
    const today = formattedDate();
    const current = taskList.filter(({ date }) => moment(date).isSame(today));
    const future = taskList.filter(({ date }) => moment(date).isAfter(today)).sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());
    const past = taskList.filter(({ date }) => moment(date).isBefore(today));

    return {
      current,
      future,
      past
    }
  };

  return (
    <div className="App">
      {showMenu
        ? <Menu
        showNews={showNews}
        updateShowNews={updateShowNews}
        updateShowMenu={updateShowMenu}
        updateShowForm={updateShowForm}
        />
        : null}
      {showForm
        ? <Form updateShowForm={updateShowForm}/>
        : null}
      <div className='app_title'>To Do
        <span onClick={() => updateShowMenu(!showMenu)} className='app_title_icon'>
          <SettingsIcon fontSize='large'/>
        </span>
      </div>
      <PeriodBlock title='Today' tasks={sortTasks().current} updateShowForm={updateShowForm} open={true} />
      <PeriodBlock title='Previous' tasks={sortTasks().past} updateShowForm={updateShowForm} />
      <FutureTasksBlock tasks={sortTasks().future} updateShowForm={updateShowForm}/>
      {showNews ? <NewsBlock/> : null}
    </div>
  );
}

export default App;
