import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { progressChartData, pieChartData } from "./data";
import { useIsFocused } from "@react-navigation/native";
import {getCharts} from "../services/getcharts"
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
  const width = Dimensions.get("window").width;
  const height = 269;
  const isFocused = useIsFocused();
  const [pieChart, setPieChart] = useState(pieChartData)
  const getFetchData = async () => {
    let fetchData = null;
    fetchData = await getCharts();
    setPieChart(fetchData?.pieChartData || pieChartData);
  }
  useEffect(() => {
    getFetchData();
  }, [isFocused])
  
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
              // backgroundColor: chartConfig.backgroundColor,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={labelStyle}>Requests</Text>
              <PieChart
                data={pieChart}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
                paddingLeft={"15"}
                absolute
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
