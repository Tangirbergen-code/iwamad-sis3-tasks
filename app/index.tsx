import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutLeft, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../src/components/AppButton';
import SwipeableTaskRow from '../src/components/SwipeableTaskRow';
import { useTasks } from '../src/context/TasksContext';
import { colors } from '../src/theme/colors';

export default function TaskListScreen() {
  const { tasks, deleteTask, toggleDone } = useTasks();
  const insets = useSafeAreaInsets();
  const openCount = tasks.filter((task) => !task.done).length;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.summary}>
          {openCount} open of {tasks.length}
        </Text>
        <Text style={styles.hint}>Swipe a task left to delete it. Long-press to mark it done.</Text>
      </View>

      {/* Animated.FlatList is React Native's FlatList with animated item positions. */}
      <Animated.FlatList
        data={tasks}
        keyExtractor={(task) => String(task.id)}
        contentContainerStyle={styles.list}
        itemLayoutAnimation={LinearTransition}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInDown} exiting={FadeOutLeft} style={styles.item}>
            <SwipeableTaskRow
              task={item}
              onPress={() => router.push(`/tasks/${item.id}`)}
              onLongPress={() => toggleDone(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          </Animated.View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Tap "New task" to add your first one.</Text>
        }
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <AppButton label="New task" onPress={() => router.push('/new')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 16, paddingTop: 16, gap: 4 },
  summary: { fontSize: 15, fontWeight: '600', color: colors.text },
  hint: { fontSize: 14, color: colors.textMuted },
  list: { padding: 16 },
  item: { paddingBottom: 10 },
  empty: { marginTop: 48, textAlign: 'center', fontSize: 16, color: colors.textMuted },
  footer: { paddingHorizontal: 16, paddingTop: 12 },
});
