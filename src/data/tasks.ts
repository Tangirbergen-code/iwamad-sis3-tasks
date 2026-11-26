export interface Task {
  id: number;
  title: string;
  notes: string;
  done: boolean;
}

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Test the app on my phone',
    notes: 'Try every screen, the swipe and the long-press in Expo Go.',
    done: false,
  },
  {
    id: 2,
    title: 'Take a screenshot for the README',
    notes: 'Save the task list as screenshots/tasks.png.',
    done: false,
  },
  {
    id: 3,
    title: 'Submit SIS 3 in Teams',
    notes: 'Paste the repository URL, not the Pages URL.',
    done: false,
  },
  {
    id: 4,
    title: 'Create the GitHub repository',
    notes: 'It is public and named iwamad-sis3-tasks.',
    done: true,
  },
];
