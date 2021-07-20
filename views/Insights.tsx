import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { Heading, Center } from 'native-base';
import Timeline from 'react-native-timeline-flatlist'

const Controller = require('../controllers/GoalController.ts');

const Insights = (props: object) => {
  const [insights, setInsights] = useState([]);
  const [noInsights, setNoInsights] = useState(false);

  useEffect(() => {
    generateInsights();
  }, [props.title]);

  const generateInsights = () => {
    let data = [];
    let dates = {};
    Controller.getGoals().then((goals) => {
      for(var i = 0; i < goals.length; i++) {
        let date = goals[i].date;
        if(dates[date] === undefined) {
          dates[date] = {completed: 0, incompleted: 0};
        }
        if(goals[i].isCompleted) {
          dates[date].completed++;
        }
        else {
          dates[date].incompleted++;
        }
      }
      for(var key in dates) {
        let item = dates[key];
        let title = "";
        if(item.incompleted > 0) {
          title = "Incomplete ❌";
        }
        else {
          title = "Complete 🎉";
        }
        let description = dates[key].completed.toString() + " out of " + (dates[key].completed + dates[key].incompleted).toString() + " goals completed";
        data.push({time: key, title: title, description: description});
      }
      data.sort((ele1, ele2) => {
        return new Date(ele1.time).getTime() - new Date(ele2.time).getTime();
      });
      if(data.length === 0) {
        setNoInsights(true);
      }
      else {
        setNoInsights(false);
      }
      setInsights(data);
      console.log(data);
    }, (error) => {
      setInsights([]);
    });
  }

  if(noInsights) {
    return (
      <Center> <Text> You have no data to be shown </Text> </Center>
    );
  }
  return (
    <Timeline
      data={insights}
      style={{marginLeft: 15, marginTop: 15}}
    />
  );
}

export default Insights;
