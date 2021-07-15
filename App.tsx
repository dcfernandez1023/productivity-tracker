import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import User from './models/User.ts';

import GoalScreen from './views/GoalScreen.tsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Text> Goals </Text>
      <GoalScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
