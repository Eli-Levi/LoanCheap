import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function EditScreen({ route, navigation }) {
  const { loan } = route.params;
  return (
    <View>
      <Text>{loan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
