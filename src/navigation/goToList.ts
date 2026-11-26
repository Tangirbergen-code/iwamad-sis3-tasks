import { router } from 'expo-router';

// Goes back to the list. If a screen was opened by a direct link and
// there is nothing to go back to, it opens the list instead.
export function goToList() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}
