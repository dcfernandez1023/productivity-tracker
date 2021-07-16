import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Box, Stack, Divider, Badge, Checkbox, TextArea, ScrollView, FlatList, Center, Input, Heading, Button, IconButton, Icon, Flex, NativeBaseProvider } from "native-base";
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

const Goal = require('../models/Goal.ts');

import { styles } from '../styles/styles.js';

const GoalScreen = (props: object) => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState(new Goal.Goal());
  const [showModal, setShowModal] = useState(false);

  const addGoal = () => {
    let goalsCopy = goals.slice();
    let newGoalCopy = Object.assign({}, newGoal);
    goalsCopy.push(newGoalCopy);
    setGoals(goalsCopy);
    console.log(goalsCopy);
    closeGoalModal();
  }

  const onChangeGoal = (id: string, field: string, e: any) => {
    let goalsCopy = goals.slice();
    if(id.trim().length == 0) {
      let newGoalCopy = Object.assign({}, newGoal);
      newGoalCopy[field] = e.nativeEvent.text;
      setNewGoal(newGoalCopy);
    }
    else {
      for(var i = 0; i < goalsCopy.length; i++) {
        if(goalsCopy[i].id === id) {
          goalsCopy[i][field] = e.nativeEvent.text;
          break;
        }
      }
      setGoals(goalsCopy);
    }
  }

  const removeGoal = (id: string) => {
    let goalsCopy = goals.slice();
    for(var i = 0; i < goalsCopy.length; i++) {
      if(goalsCopy[i].id === id) {
        goalsCopy.splice(i, 1);
        break;
      }
    }
    setGoals(goalsCopy);
  }

  const openGoalModal = () => {
    setShowModal(true);
  }

  const closeGoalModal = () => {
    setShowModal(false);
    setNewGoal(new Goal.Goal());
  }

  return (
    <ScrollView>
      <Modal
        isVisible={showModal}
        onSwipeComplete={closeGoalModal}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.modalView}
      >
        <View style={{backgroundColor: "white"}}>
          <Input
            style={styles.fullWidth}
            variant="underlined"
            placeholder="Goal Name"
            onChange={(e) => {onChangeGoal("", "name", e)}}
          />
          <TextArea
            h={20}
            placeholder="Description"
            onChange={(e) => {onChangeGoal("", "description", e)}}
          />
        </View>
        <Stack direction="row">
          <View style={{width: "50%"}}>
            <IconButton
              variant="solid"
              icon={<Icon size="md" as={<AntDesign name="closecircleo" />} color="white" />}
              onPress={closeGoalModal}
              style={{backgroundColor: "red"}}
            />
          </View>
          <View style={{width: "50%"}}>
          <IconButton
            variant="solid"
            icon={<Icon size="md" as={<AntDesign name="checkcircleo" />} color="white" />}
            onPress={addGoal}
            style={{backgroundColor: "green"}}
            isDisabled={newGoal.name.trim().length == 0}
          />
          </View>
        </Stack>
      </Modal>
      <Stack direction="row">
        <Button size="lg" variant="ghost" style={{width: "25%"}}>
          {"<<"}
        </Button>
        <Button size="lg" variant="ghost" style={{width: "50%"}}>
          Today
        </Button>
        <Button size="lg" variant="ghost" style={{width: "25%"}}>
          {">>"}
        </Button>
      </Stack>
      <Heading style={styles.goalHeading}> Today's Goals </Heading>
      {goals.map((goal) => {
        return (
          <View style={{marginLeft: 15}} key={goal.id}>
            <Stack direction="row">
              <Checkbox
                accessibilityLabel={goal.id}
                onChange={(isSelected) => {
                  let copy = goals.slice();
                  for(var i = 0; i < copy.length; i++) {
                    if(copy[i].id === goal.id) {
                      copy[i].isCompleted = isSelected;
                      break;
                    }
                  }
                  setGoals(copy);
                }}
              />
              <Text> {goal.name} </Text>
            </Stack>
            <Text> {goal.description} </Text>
            <Divider my={2} />
          </View>
        );
      })}
      <Center style={{marginTop: 15}}>
        <Button style={{width: "80%"}} size="lg" onPress={openGoalModal}> Add Goal </Button>
      </Center>
    </ScrollView>
  );
}

export default GoalScreen;
