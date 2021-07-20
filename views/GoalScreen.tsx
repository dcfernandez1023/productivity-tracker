import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Box, Stack, Divider, Badge, Checkbox, TextArea, FormControl, ScrollView, FlatList, Center, Input, Heading, Button, IconButton, Icon, Flex, NativeBaseProvider } from "native-base";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Goal = require('../models/Goal.ts');
const Controller = require('../controllers/GoalController.ts');

import { styles } from '../styles/styles.js';

const GoalScreen = (props: object) => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState(new Goal.Goal());
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [editing, setEditing] = useState(false);
  const [goal, setGoal] = useState();

  useEffect(() => {
    Controller.getGoals().then((res) => {
      setGoals(res);
    }, (error) => {
      setGoals([]);
    });
  }, []);

  const addGoal = () => {
    let goalsCopy = goals.slice();
    let newGoalCopy = Object.assign({}, newGoal);
    newGoalCopy.date = date.toLocaleDateString();
    goalsCopy.push(newGoalCopy);
    setGoals(goalsCopy);
    Controller.writeGoals(goalsCopy);
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
      if(editing) {
        let goalCopy = Object.assign({}, goal);
        goalCopy[field] = e.nativeEvent.text;
        setGoal(goalCopy);
        return;
      }
      for(var i = 0; i < goalsCopy.length; i++) {
        if(goalsCopy[i].id === id) {
          goalsCopy[i][field] = e.nativeEvent.text;
          break;
        }
      }
      setGoals(goalsCopy);
      Controller.writeGoals(goalsCopy);
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
    Controller.writeGoals(goalsCopy);
    setGoal();
    setEditing(false);
  }

  const openGoalModal = () => {
    setShowModal(true);
  }

  const closeGoalModal = () => {
    setShowModal(false);
    setNewGoal(new Goal.Goal());
  }

  const formatDateText = () => {
    if(date.getDate() - new Date().getDate() == 0) {
      return "Today";
    }
    if(new Date().getDate() - date.getDate() == 1) {
      return "Yesterday";
    }
    return date.toLocaleDateString();
  }

  if(editing && goal !== undefined) {
    return (
      <ScrollView>
        <Stack direction="row" style={{marginBottom: 10}}>
          <View style={{flex: 3, padding: 5, alignItems: "flex-start"}}>
            <IconButton
              size="lg"
              variant="ghost"
              icon={<Ionicons name="arrow-back" size={24} color="black" />}
              onPress={() => {
                let goalsCopy = goals.slice();
                for(var i = 0; i < goalsCopy.length; i++) {
                  if(goalsCopy[i].id === goal.id) {
                    goalsCopy[i] = Object.assign({}, goal);
                    break;
                  }
                }
                setGoals(goalsCopy);
                Controller.writeGoals(goalsCopy);
                setGoal();
                setEditing(false);
              }}
            >
            </IconButton>
          </View>
          <View style={{flex: 3, padding: 5, alignItems: "flex-end"}}>
            <IconButton
              size="lg"
              icon={<Feather name="trash-2" size={24} color="black" />}
              onPress={() => {
                removeGoal(goal.id);
              }}
            >
            </IconButton>
          </View>
        </Stack>
        <Stack direction="column" space={5}>
          {goal.isCompleted ?
            <Badge colorScheme="success" variant="subtle" style={{width: "20%", alignItems: "center", marginLeft: 5}}>
               Completed
             </Badge>
             :
             <View></View>
          }
          <FormControl>
            <FormControl.Label> Goal Name </FormControl.Label>
            <Input
              placeholder="Goal Name"
              value={goal.name}
              onChange={(e) => {
                onChangeGoal(goal.id, "name", e)
              }}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label> Description </FormControl.Label>
            <TextArea
              h={20}
              placeholder="Description"
              value={goal.description}
              onChange={(e) => {
                onChangeGoal(goal.id, "description", e)
              }}
            />
          </FormControl>
        </Stack>
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <Modal
        isVisible={showCalendar}
      >
        <Calendar
          onDayPress={(day) => {
            setDate(new Date(day.year, day.month - 1, day.day));
            setShowCalendar(false);
          }}
        />
      </Modal>
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
        <Button
          size="lg"
          variant="ghost"
          style={{width: "25%"}}
          onPress={() => {
            let dateCopy = new Date(date.toLocaleDateString());
            dateCopy.setDate(dateCopy.getDate() - 1);
            setDate(dateCopy);
          }}
        >
          {"<<"}
        </Button>
        <Button
          size="lg"
          variant="ghost"
          style={{width: "50%"}}
          onPress={() => setShowCalendar(true)}
        >
          {formatDateText()}
        </Button>
        <Button
          size="lg"
          variant="ghost"
          style={{width: "25%"}}
          onPress={() => {
            let dateCopy = new Date(date.toLocaleDateString());
            dateCopy.setDate(dateCopy.getDate() + 1);
            setDate(dateCopy);
          }}
        >
          {">>"}
        </Button>
      </Stack>
      {goals.map((goal) => {
        if(goal.date === date.toLocaleDateString()) {
          return (
            <View style={{marginLeft: 15}} key={goal.id}>
              <Button
                size="lg"
                variant="ghost"
                colorScheme="primary"
                style={{width: "100%", justifyContent: "flex-start"}}
                onPress={() => {
                  setGoal(goal);
                  setEditing(true);
                }}
              >
                <Stack direction="row">
                  <Text style={{width: "75%"}}> {goal.name} </Text>
                  <View style={{width: "25%", alignItems: "flex-end"}}>
                    <Checkbox
                      size="lg"
                      accessibilityLabel={goal.id}
                      defaultIsChecked={goal.isCompleted}
                      onChange={(isSelected) => {
                        let copy = goals.slice();
                        for(var i = 0; i < copy.length; i++) {
                          if(copy[i].id === goal.id) {
                            copy[i].isCompleted = isSelected;
                            break;
                          }
                        }
                        setGoals(copy);
                        Controller.writeGoals(copy);
                      }}
                    />
                  </View>
                </Stack>
                {goal.description.trim().length > 0 ?
                  <Text style={styles.italic}> {goal.description} </Text>
                :
                  <View></View>
                }
                {goal.isCompleted ?
                  <Badge colorScheme="success" variant="subtle" style={{width: "20%", alignItems: "center", marginTop: 8}}>
                     Completed
                   </Badge>
                   :
                   <View></View>
                }
              </Button>
              <Divider my={2} />
            </View>
          );
        }
      })}
      <Center style={{marginTop: 15}}>
        <Button style={{width: "80%"}} size="lg" onPress={openGoalModal}> Add Goal </Button>
      </Center>
    </ScrollView>
  );
}

export default GoalScreen;
