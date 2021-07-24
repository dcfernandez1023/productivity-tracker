import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { Heading, Center, Select } from 'native-base';
import Timeline from 'react-native-timeline-flatlist'

const Controller = require('../controllers/GoalController.ts');

const Insights = (props: object) => {
  const [insights, setInsights] = useState([]);
  const [range, setRange] = useState("all");
  const [noInsights, setNoInsights] = useState(false);

  useEffect(() => {
    generateInsights();
  }, [props.title, range]);

  const generateInsights = (filter) => {
    let data = [];
    let dates = {};
    Controller.getGoals().then((goals) => {
      for(var i = 0; i < goals.length; i++) {
        let date = goals[i].date;
        if(range === "7") {
          var curr = new Date(date).getTime();
          var d = new Date();
          d.setDate(d.getDate()-7);
          if(!(d.getTime() <= curr && curr <= new Date().getTime())) {
            continue;
          }
        }
        else if(range === "month") {
          var currMonth = new Date().getMonth() + 1;
          if(currMonth != new Date(date).getMonth() + 1) {
            continue;
          }
        }
        else if(range === "30") {
          var curr = new Date(date).getTime();
          var d = new Date();
          d.setDate(d.getDate()-30);
          if(!(d.getTime() <= curr && curr <= new Date().getTime())) {
            continue;
          }
        }
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
      console.log(dates);
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
        return new Date(ele2.time).getTime() - new Date(ele1.time).getTime();
      });
      if(data.length === 0) {
        setNoInsights(true);
      }
      else {
        setNoInsights(false);
      }
      console.log(data);
      setInsights(data);
    }, (error) => {
      setInsights([]);
    });
  }

  return (
    <View style={{height: "100%"}}>
      <View style={{marginBottom: 15, alignItems: "center"}}>
        <Select
          selectedValue={range}
          onValueChange={(itemValue) => {
            setRange(itemValue);
            //generateInsights(itemValue);
          }}
          minWidth={"80%"}
        >
          <Select.Item label="All-time" value="all" />
          <Select.Item label="This month" value="month" />
          <Select.Item label="Last 7 days" value="7" />
          <Select.Item label="Last 30 days" value="30" />
        </Select>
      </View>
      {noInsights ?
        <Center> <Text> You have no data to be shown </Text> </Center>
        :
        <Timeline
          data={insights}
          style={{marginLeft: 15, marginTop: 15}}
        />
      }
    </View>
  );
}

export default Insights;
