import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../../src/components/AppButton';
import { useTasks } from '../../src/context/TasksContext';
import { goToList } from '../../src/navigation/goToList';
import { colors } from '../../src/theme/colors';

export default function TaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, deleteTask, toggleDone } = useTasks();
  const [isDeleted, setIsDeleted] = useState(false);
  const insets = useSafeAreaInsets();

  const task = tasks.find((item) => item.id === Number(id));

  if (!task) {
    // While the screen is closing after Delete, do not flash "Task not found".
    if (isDeleted) {
      return <View style={styles.screen} />;
    }

    return (
      <View style={[styles.screen, styles.content]}>
        <Stack.Screen options={{ title: 'Task not found' }} />
        <Text style={styles.title}>Task not found</Text>
        <Text style={styles.notes}>There is no task with id "{id}". It may have been deleted.</Text>
        <AppButton label="Back to my tasks" onPress={() => router.replace('/')} />
      </View>
    );
  }

  const handleDelete = () => {
    setIsDeleted(true);
    deleteTask(task.id);
    goToList();
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
    >
      <Stack.Screen options={{ title: task.title }} />
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={[styles.status, task.done && styles.statusDone]}>
          {task.done ? 'Done' : 'Open'}
        </Text>
        <Text style={styles.notes}>{task.notes === '' ? 'No notes.' : task.notes}</Text>
      </View>
      <AppButton
        label={task.done ? 'Mark as open' : 'Mark as done'}
        onPress={() => toggleDone(task.id)}
      />
      <AppButton label="Delete task" variant="danger" onPress={handleDelete} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 12 },
  card: {
    padding: 16,
    gap: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  status: { fontSize: 14, fontWeight: '600', color: colors.primary },
  statusDone: { color: colors.success },
  notes: { fontSize: 16, lineHeight: 22, color: colors.textMuted },
});
