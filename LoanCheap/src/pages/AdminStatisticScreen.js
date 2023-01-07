import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { progressChartData, pieChartData } from "./data";

const chartConfigs = [
  {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
];

const AdminStatisticScreen = () => {
  const width = Dimensions.get("window").width - 10;
  const height = 269;
  return (
    <ScrollView>
      {chartConfigs.map((chartConfig) => {
        const labelStyle = {
          color: chartConfig.color(),
          marginVertical: 10,
          color: "#05445E",
          textAlign: "center",
          fontSize: 16,
        };
        const graphStyle = {
          marginVertical: 8,
          ...chartConfig.style,
        };
        return (
          <ScrollView
            key={Math.random()}
            style={{
              backgroundColor: chartConfig.backgroundColor,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={labelStyle}>Progress Chart</Text>
              <ProgressChart
                data={progressChartData}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Banks</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
            </View>
          </ScrollView>
        );
      })}
    </ScrollView>
  );
};

export default AdminStatisticScreen;

const styles = StyleSheet.create({});
