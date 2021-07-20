import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { Heading, Center } from 'native-base';
import Timeline from 'react-native-timeline-flatlist'

const Controller = require('../controllers/GoalController.ts');

const Insights = (props: object) => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    generateInsights();
  }, []);

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
        let description = dates[key].completed.toString() + " out of " + (dates[key].completed + dates[key].incompleted).toString() + " completed";
        data.push({time: key, title: "Goals Completed ("+key+")", description: description});
      }
      data.sort((ele1, ele2) => {
        return new Date(ele1).getTime() - new Date(ele2).getTime();
      });
      console.log(data);
    }, (error) => {
      setInsights([]);
    });
  }

  return (
    <Center style={{marginTop: 30}}>
      <Timeline
        data={insights}
      />
    </Center>
  );
}

export default Insights;
