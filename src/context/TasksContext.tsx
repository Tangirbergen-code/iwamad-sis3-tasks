import { createContext, ReactNode, useContext, useRef, useState } from 'react';

import { initialTasks, Task } from '../data/tasks';

interface TasksContextValue {
  tasks: Task[];
  addTask: (title: string, notes: string) => void;
  deleteTask: (id: number) => void;
  toggleDone: (id: number) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  // A counter that only grows, so the id of a deleted task is never used again.
  const nextId = useRef(Math.max(0, ...initialTasks.map((task) => task.id)) + 1);

  const addTask = (title: string, notes: string) => {
    const task: Task = { id: nextId.current, title, notes, done: false };
    nextId.current += 1;
    setTasks((current) => [task, ...current]);
  };

  const deleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const toggleDone = (id: number) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleDone }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const value = useContext(TasksContext);
  if (!value) {
    throw new Error('useTasks must be used inside TasksProvider');
  }
  return value;
}
