
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import './styles/global.css';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Research competitor designs', tags: ['Design'] },
    'task-2': { id: 'task-2', content: 'Setup project repository', tags: ['Dev', 'High'] },
    'task-3': { id: 'task-3', content: 'Design system tokens', tags: ['Design'] },
    'task-4': { id: 'task-4', content: 'Implement drag and drop', tags: ['Dev'] },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('kanban-data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('legion-theme') || 'var(--neon-cyan)';
  });

  const [currentMode, setCurrentMode] = useState(() => {
    return localStorage.getItem('legion-mode') || 'dark';
  });

  const [currentView, setCurrentView] = useState('kanban');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-primary', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentMode);
  }, [currentMode]);

  useEffect(() => {
    localStorage.setItem('kanban-data', JSON.stringify(data));
  }, [data]);

  const handleThemeChange = (themeValue) => {
    setCurrentTheme(themeValue);
    localStorage.setItem('legion-theme', themeValue);
  };

  const handleModeChange = (modeValue) => {
    setCurrentMode(modeValue);
    localStorage.setItem('legion-mode', modeValue);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // --- Board Logic ---

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle Column Reordering
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    // Handle Task Reordering
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const addTask = (columnId, content, tags = []) => {
    const newTaskId = `task - ${Date.now()} `;
    const newTask = {
      id: newTaskId,
      content,
      tags: tags.length > 0 ? tags : ['New']
    };

    const column = data.columns[columnId];
    const newColumn = {
      ...column,
      taskIds: [...column.taskIds, newTaskId],
    };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
  };

  const updateTask = (taskId, newContent, newTags) => {
    const newTask = {
      ...data.tasks[taskId],
      content: newContent,
      tags: newTags,
    };

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [taskId]: newTask,
      },
    };

    setData(newState);
  };

  const deleteTask = (columnId, taskId) => {
    const column = data.columns[columnId];
    const newTaskIds = column.taskIds.filter(id => id !== taskId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    setData(newState);
  };

  const deleteColumn = (columnId) => {
    const newColumnOrder = data.columnOrder.filter(id => id !== columnId);
    const newColumns = { ...data.columns };
    delete newColumns[columnId];

    const newState = {
      ...data,
      columns: newColumns,
      columnOrder: newColumnOrder,
    };

    setData(newState);
  };

  const updateColumnTitle = (columnId, newTitle) => {
    const newColumn = {
      ...data.columns[columnId],
      title: newTitle,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [columnId]: newColumn,
      },
    };

    setData(newState);
  };

  const addColumn = (title) => {
    if (!title.trim()) return;

    const newColumnId = `column - ${Date.now()} `;
    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...data.columnOrder, newColumnId],
    };

    setData(newState);
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        onThemeChange={handleThemeChange}
        onModeChange={handleModeChange}
        currentMode={currentMode}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      <div className="main-content">
        <TopBar />
        <div className="content-area">
          {currentView === 'kanban' ? (
            <Board
              data={data}
              onDragEnd={onDragEnd}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              addColumn={addColumn}
              deleteColumn={deleteColumn}
              updateColumnTitle={updateColumnTitle}
            />
          ) : (
            <Dashboard data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
