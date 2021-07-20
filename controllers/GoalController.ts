import AsyncStorage from '@react-native-async-storage/async-storage';

const writeGoals = async (goals: array): array => {
  let goalsObj = {goals: goals};
  await AsyncStorage.setItem("goals", JSON.stringify(goalsObj));
  return goals;
}

const getGoals = async (): any => {
  const goals = await AsyncStorage.getItem("goals");
  if(goals === null) {
    return [];
  }
  goalsObj = JSON.parse(goals);
  return goalsObj.goals;
}

export { writeGoals, getGoals };
