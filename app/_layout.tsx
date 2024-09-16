import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**LAYOUT APPARTENENTE A TUTI I FILE DELLA APPLICAZIONE
 * 
 * -Ogni screen che incorpora il drawer viene visto come un stack screen
 * quindi magari si aggiunge un modale in futuro (per comprare Premium)
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
