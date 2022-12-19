import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const EditElement = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditScreen", { loan: data })}
    >
      <View style={styles.text}>
        <Text style={styles.btn}>Edit</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EditElement;

const styles = StyleSheet.create({
  text: { margin: 6 },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 45,
    textAlign: "center",
  },
});
