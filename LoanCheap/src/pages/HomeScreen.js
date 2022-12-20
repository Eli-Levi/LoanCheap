import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../../App";
import { SearchBar } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
const HomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  const [search, onChangeSearch] = useState("");

  return (
    <View>
      <View style={styles.view}>
        <SearchBar
          round
          onChangeText={onChangeSearch}
          searchIcon={{ size: 24 }}
          onClear={(text) => onChangeSearch("")}
          placeholder="Type Here..."
          value={search}
          onSubmitEditing={() => {
            console.log(search);
          }}
          lightTheme="true"
        />
      </View>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
