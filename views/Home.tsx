import React, { useState } from 'react';
import { View, Text } from "react-native";
import { Heading, Center } from "native-base";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Footer = createBottomTabNavigator();

import GoalScreen from './GoalScreen.tsx';
import Insights from './Insights.tsx';

import { styles } from '../styles/styles.js';

const Home = (props: object) => {
  return (
    <View style={styles.fullWidthAndHeight}>
      <View style={styles.navbar}>
        <Heading style={styles.centerAlign}> Productivity Tracker </Heading>
      </View>
      <NavigationContainer>
        <Footer.Navigator>
          <Footer.Screen style={styles.largeFont} name="Goals 🎯" component={GoalScreen}/>
          <Footer.Screen name="Insights 📈" component={Insights}/>
        </Footer.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Home;
