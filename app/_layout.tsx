import { Stack } from 'expo-router';

import { TasksProvider } from '../src/context/TasksContext';

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'My Tasks' }} />
      </Stack>
    </TasksProvider>
  );
}
