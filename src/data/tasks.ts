export interface Task {
  id: number;
  title: string;
  notes: string;
  done: boolean;
}

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Go to the gym',
    notes: 'A one-hour workout after classes.',
    done: false,
  },
  {
    id: 2,
    title: 'Read 20 pages',
    notes: 'Continue the current book before bed.',
    done: false,
  },
  {
    id: 3,
    title: 'Top up my transport card',
    notes: 'Add money before Monday.',
    done: true,
  },
  {
    id: 4,
    title: 'Plan next week',
    notes: 'Write down deadlines and class times.',
    done: false,
  },
];
