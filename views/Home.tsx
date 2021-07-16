import React, { useState } from 'react';
import { View, Text } from "react-native";
import { Heading, Center } from "native-base";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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
        <Footer.Navigator
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
        >
          <Footer.Screen
            name="Goals"
            component={GoalScreen}
            options={{
              tabBarLabel: "Goals",
              tabBarIcon: ({ color, size }) => (
                <Feather name="target" size={24} color="black" />
              ),
            }}
          />
          <Footer.Screen
            name="Insights"
            component={Insights}
            options={{
              tabBarLabel: "Insights",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="insights" size={24} color="black" />
              ),
            }}
          />
        </Footer.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Home;
