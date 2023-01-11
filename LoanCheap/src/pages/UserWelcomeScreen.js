import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Tile } from '@rneui/themed';
import React from 'react'

const UserWelcomeScreen = () => {
  return (
    <View style={{flex: 1, padding: 16}}>
  <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>Welcome to our app</Text>
  
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <View style={{width: 24, height: 24, backgroundColor: '#05445E', borderRadius: 12, marginRight: 8}} />
    <Text style={{fontSize: 18, fontWeight: 'bold'}}>As a customer you can:</Text>
  </View>
  <View>
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
      <Text style={{fontSize: 16, marginRight: 8}}>1.</Text>
      <Text style={{fontSize: 16}}>Search for loans in the system</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
      <Text style={{fontSize: 16, marginRight: 8}}>2.</Text>
      <Text style={{fontSize: 16}}>Submit a request for loans</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
      <Text style={{fontSize: 16, marginRight: 8}}>3.</Text>
      <Text style={{fontSize: 16}}>View pending and accepted loans you submitted</Text>
    </View>
  </View>
  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
    <View style={{width: 24, height: 24, backgroundColor: '#05445E', borderRadius: 12, marginRight: 8}} />
    <Text style={{fontSize: 18, fontWeight: 'bold'}}>As an admin you can:</Text>
  </View>
  <View>
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
      <Text style={{fontSize: 16, marginRight: 8}}>1.</Text>
      <Text style={{fontSize: 16}}>Create a new loan in the system</Text>
</View>
<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
<Text style={{fontSize: 16, marginRight: 8}}>2.</Text>
<Text style={{fontSize: 16}}>See submitted requests for loans from users</Text>
</View>
<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
<Text style={{fontSize: 16, marginRight: 8}}>3.</Text>
<Text style={{fontSize: 16}}>Accept and reject requests for loans you created</Text>
</View>
<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
<Text style={{fontSize: 16, marginRight: 8}}>4.</Text>
<Text style={{fontSize: 16}}>Contact users who submitted for your loans via phone or email</Text>
</View>
<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
<Text style={{fontSize: 16, marginRight: 8}}>5.</Text>
<Text style={{fontSize: 16}}>See statistics</Text>
</View>
</View>
</View>

  );
};

export default UserWelcomeScreen;

const styles = StyleSheet.create({});
