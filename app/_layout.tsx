import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { TasksProvider } from '../src/context/TasksContext';
import { colors } from '../src/theme/colors';

// Keeps the list under a screen opened by a direct link, so Back returns to it.
export const unstable_settings = { anchor: 'index' };

export default function RootLayout() {
  return (
    <TasksProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerTintColor: colors.primary, headerTitleStyle: { color: colors.text } }}>
        <Stack.Screen name="index" options={{ title: 'My Tasks' }} />
        <Stack.Screen name="tasks/[id]" options={{ title: 'Task' }} />
        <Stack.Screen
          name="new"
          options={{ title: 'New Task', presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
    </TasksProvider>
  );
}
