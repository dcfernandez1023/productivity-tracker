import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Stack, NativeBaseProvider } from "native-base";

import { styles } from './styles/styles.js';

import Home from './views/Home.tsx';

export default function App() {
  return (
    <NativeBaseProvider>
      <Stack alignItems="center" style={styles.topSpacing}>
        <Home />
      </Stack>
    </NativeBaseProvider>
  );
}
