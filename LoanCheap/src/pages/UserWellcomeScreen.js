import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Tile } from '@rneui/themed';
import React from 'react'

const UserWellcomeScreen = () => {
  return (
    <View>
      <Text>  </Text>
      <Text>  Wellcome to our app,</Text>
      <Text>  Here, as a costumer you can:</Text>
      <Text>            1.Search for loans in the system</Text>
      <Text>            2.Submit a request for loans</Text>
      <Text>            3.View pending and accepted loans you submited</Text>
      <Text>  </Text>
      <Text>  Also, as an admin you can:</Text>
      <Text>            1.Create a new loan in the system</Text>
      <Text>            2.See submited requests for loans from users</Text>
      <Text>            3.Accept and reject requsets for loans you created</Text>
      <Text>            4.Contact users who submitted for your loans via Phone or E-mail</Text>
      <Text>            5.See statistics</Text>
    </View>
  )
}

export default UserWellcomeScreen

const styles = StyleSheet.create({})