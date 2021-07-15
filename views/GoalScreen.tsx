import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, Button } from "react-native";

const Goal = require('../models/Goal.ts');

const GoalScreen = (props: object) => {
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    if(goals[goals.length - 1].name.trim().length === 0) {
      return;
    }
    let copy = goals.slice();
    copy.push(new Goal());
    setGoals(copy);
  }

  return (
    <View>
      <SafeAreaView>
        {goals.map((goal: object) => {
          console.log(goal);
          return (
            <TextInput
              key={goal.id}
              style={styles.input}
              placeholder={typeof(goal.id)}
            />
          );
        })}
      </SafeAreaView>
      <Button
        title="Add Goal"
        onPress={addGoal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
  },
});

export default GoalScreen;
