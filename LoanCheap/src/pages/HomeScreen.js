import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { AuthContext } from "../../App"

const HomeScreen = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})