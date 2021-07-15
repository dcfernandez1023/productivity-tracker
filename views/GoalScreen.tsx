import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, Button } from "react-native";

const Goal = require('../models/Goal.ts');

const GoalScreen = (props: object) => {
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    let copy = goals.slice();
    copy.push(new Goal.Goal());
    setGoals(copy);
  }

  const onChangeGoalName = (id: string, name: string) => {
    let copy = goals.slice();
    for(var i = 0; i < copy.length; i++) {
      if(copy[i].id === id) {
        copy[i].name = name;
        break;
      }
    }
    setGoals(copy);
  }

  const removeGoal = (id: string) => {
    let copy = goals.slice();
    for(var i = 0; i < copy.length; i++) {
      if(copy[i].id === id) {
        copy.splice(i, 1);
        break;
      }
    }
    setGoals(copy);

  }

  return (
    <View>
      <SafeAreaView>
        {goals.map((goal: object) => {
          return (
            <View>
              <TextInput
                key={goal.id}
                style={styles.input}
                onChangeText={(text) => {onChangeGoalName(goal.id, text)}}
                placeholder="Enter Goal Name"
              />
              <Button
                title="x"
                color="red"
                onPress={() => {removeGoal(goal.id)}}
              />
            </View>
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
