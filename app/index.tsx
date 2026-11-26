import { StyleSheet, Text, View } from 'react-native';

export default function TaskListScreen() {
  return (
    <View style={styles.container}>
      <Text>My Tasks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
