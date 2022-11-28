import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  Switch,
} from 'react-native';
import {AuthContext} from '../../App';
const SignUpScreen = ({navigation}) => {
  const [name, onChangeName] = useState(null);
  const [phoneNumber, onChangePhoneNumber] = useState(null);
  const [email, onChangeEmail] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [bankName, onChangeBankName] = useState(null);
  const [filesLink, onChangeFilesLink] = useState(null);
  const {signUp} = React.useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleLogo}>LoanCheap</Text>
        <Text style={styles.title}>SignUp</Text>
        <Text style={styles.subTitle}>Create an account</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Full name"
            placeholderTextColor="#05445E"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email Address"
            placeholderTextColor="#05445E"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
            placeholderTextColor="#05445E"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#05445E"
            secureTextEntry
          />
          <View style={styles.switch}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.subTitle}>Enable for admin account</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeBankName}
            value={bankName}
            placeholder="Bank name"
            placeholderTextColor="#05445E"
            editable={isEnabled}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeFilesLink}
            value={filesLink}
            placeholder="Bank files pdf link"
            placeholderTextColor="#05445E"
            editable={isEnabled}
          />
        </SafeAreaView>
        <TouchableHighlight onPress={() => navigation.navigate('SignIn')}>
          <View>
            <Text style={styles.createButton}>
              Back to LogIn screen? click here
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.fixToText}>
          <Button
            color="#05445E"
            title="Sign up"
            onPress={() =>
              signUp({name, phoneNumber, email, password, bankName, filesLink})
            }
          />
        </View>
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#D4F1F4',
  },
  titleLogo: {
    marginTop: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#05445E',
    borderRadius: 6,
    color: '#05445E',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 24,
    borderRadius: 6,
    color: '#05445E',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#05445E',
    textAlign: 'left',
    fontSize: 16,
  },
  input: {
    marginTop: 24,
    color: '#05445E',
    textAlign: 'left',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#05445E',
  },
  createButton: {
    marginTop: 10,
    color: '#05445E',
    textAlign: 'left',
    fontSize: 16,
  },
  fixToText: {
    marginTop: 10,
  },
  switch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
