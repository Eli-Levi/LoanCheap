import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { AuthContext } from "../../App";
import { Dialog, Input, CheckBox, ListItem, Avatar, FAB } from "@rneui/themed";

const ProfileHeader = () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
