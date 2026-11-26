import { ComponentRef, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../src/components/AppButton';
import { useTasks } from '../src/context/TasksContext';
import { goToList } from '../src/navigation/goToList';
import { colors } from '../src/theme/colors';

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const notesInput = useRef<ComponentRef<typeof TextInput>>(null);
  const insets = useSafeAreaInsets();

  const handleChangeTitle = (text: string) => {
    setTitle(text);
    setError('');
  };

  const handleSave = () => {
    if (title.trim() === '') {
      setError('Please enter a title. The task was not added.');
      return;
    }
    addTask(title.trim(), notes.trim());
    goToList();
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={[styles.input, error !== '' && styles.inputError]}
          value={title}
          onChangeText={handleChangeTitle}
          placeholder="What do you need to do?"
          placeholderTextColor={colors.textMuted}
          aria-label="Title"
          autoFocus
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => notesInput.current?.focus()}
        />
        {error !== '' && (
          <Text style={styles.error} role="alert">
            {error}
          </Text>
        )}

        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          ref={notesInput}
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add details"
          placeholderTextColor={colors.textMuted}
          aria-label="Notes"
          returnKeyType="done"
          onSubmitEditing={handleSave}
        />

        <AppButton label="Save task" onPress={handleSave} style={styles.save} />
        <AppButton label="Cancel" variant="secondary" onPress={goToList} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 8 },
  label: { marginTop: 8, fontSize: 14, fontWeight: '600', color: colors.text },
  input: {
    minHeight: 48,
    paddingHorizontal: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  inputError: { borderColor: colors.danger },
  error: { fontSize: 14, color: colors.danger },
  save: { marginTop: 12 },
});
