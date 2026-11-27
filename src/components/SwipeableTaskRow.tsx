import { Pressable, StyleSheet, Text } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { Task } from '../data/tasks';
import { colors } from '../theme/colors';
import TaskRow from './TaskRow';

interface SwipeableTaskRowProps {
  task: Task;
  onPress: () => void;
  onLongPress: () => void;
  onDelete: () => void;
}

export default function SwipeableTaskRow({
  task,
  onPress,
  onLongPress,
  onDelete,
}: SwipeableTaskRowProps) {
  const renderDeleteAction = () => (
    <Pressable
      role="button"
      aria-label={`Delete ${task.title}`}
      onPress={onDelete}
      style={({ pressed }) => [styles.delete, pressed && styles.deletePressed]}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  );

  return (
    <ReanimatedSwipeable
      renderRightActions={renderDeleteAction}
      rightThreshold={40}
      overshootRight={false}
    >
      <TaskRow task={task} onPress={onPress} onLongPress={onLongPress} />
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  delete: {
    width: 96,
    marginLeft: 8,
    // 1 point smaller than the row, so no red edge shows around the closed row's corners.
    marginVertical: 1,
    marginRight: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger,
  },
  deletePressed: { backgroundColor: colors.dangerPressed },
  deleteText: { color: colors.onColor, fontSize: 16, fontWeight: '700' },
});
