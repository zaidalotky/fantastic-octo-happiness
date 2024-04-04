import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  //  localStorge for save the tasks in it
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      setTasks(tasks);
    }
  }, []);

  const handleTaskChange = (event) => {  // handle the string that inserted
    setTask(event.target.value);
  };

  const addTask = () => {      // handle the string that inserted
    if (task.trim() !== '') {      // check if the value is not empty
      setTasks((prevTasks) => [...prevTasks, task]);       //adding the new task with the old one

      setTask('');     // empty the input 
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };



  return (
    <>
      <div className="container">
        <h1 className='title'>Start Tasking Now</h1>
        <div className="input-con">
          <label htmlFor="taskHere" className='label'>Enter Task Here</label>
          <input
            type="text"
            name="taskHere"
            id="taskField"
            value={task}
            onChange={handleTaskChange}
            className='task'
          />
          <button onClick={addTask} className='btn btn1'>Add Task</button>
        </div>
        <div className="content">
          {tasks.length === 0 ? (
            <p className='empty-task'>No tasks yet</p>
          ) : (
            <ul className='task-menu'>
              {tasks.map((data, index) => (
                <li key={index} className='tasks'>
                  <p>{data}</p>
                  <button className='del' onClick={() => deleteTask(index)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
