import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import TaskRow from '../src/components/TaskRow';
import { useTasks } from '../src/context/TasksContext';
import { colors } from '../src/theme/colors';

export default function TaskListScreen() {
  const { tasks } = useTasks();

  return (
    <View style={styles.screen}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => String(task.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TaskRow task={item} onPress={() => router.push(`/tasks/${item.id}`)} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16 },
  item: { paddingBottom: 10 },
  empty: { marginTop: 48, textAlign: 'center', fontSize: 16, color: colors.textMuted },
});
