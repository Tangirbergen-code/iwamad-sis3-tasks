import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Task } from '../data/tasks';
import { colors } from '../theme/colors';

interface TaskRowProps {
  task: Task;
  onPress: () => void;
}

export default function TaskRow({ task, onPress }: TaskRowProps) {
  return (
    <Pressable
      role="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.texts}>
        <Text style={[styles.title, task.done && styles.titleDone]} numberOfLines={1}>
          {task.title}
        </Text>
        {task.notes !== '' && (
          <Text style={styles.notes} numberOfLines={1}>
            {task.notes}
          </Text>
        )}
      </View>
      <Text style={[styles.status, task.done && styles.statusDone]}>
        {task.done ? 'Done' : 'Open'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  rowPressed: { backgroundColor: colors.cardPressed },
  texts: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: '600', color: colors.text },
  titleDone: { textDecorationLine: 'line-through', color: colors.textMuted },
  notes: { fontSize: 14, color: colors.textMuted },
  status: { fontSize: 13, fontWeight: '600', color: colors.primary },
  statusDone: { color: colors.success },
});
