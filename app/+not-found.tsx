import { router, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../src/components/AppButton';
import { colors } from '../src/theme/colors';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Page not found' }} />
      <Text style={styles.code}>404</Text>
      <Text style={styles.message}>There is no page at this address.</Text>
      <AppButton label="Back to my tasks" onPress={() => router.replace('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
    backgroundColor: colors.background,
  },
  code: { fontSize: 48, fontWeight: '700', color: colors.text },
  message: { fontSize: 16, color: colors.textMuted, textAlign: 'center' },
});
