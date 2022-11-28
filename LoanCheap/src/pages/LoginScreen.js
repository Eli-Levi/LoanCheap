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
} from 'react-native';
import { AuthContext } from "../../App"

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState(null);
  const [password, onChangePassword] = useState(null);
  const {signIn}  = React.useContext(AuthContext);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleLogo}>LoanCheap</Text>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>Please sign in</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email Address"
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
        </SafeAreaView>
        <TouchableHighlight onPress={() => navigation.navigate('SignUp')}>
          <View>
            <Text style={styles.createButton}>
              Don't have an account? sign up
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.fixToText}> 
          <Button
            color="#05445E"
            title="Login"
            onPress={() => signIn({ email, password })}
          />
        </View>
      </View>
    </>
  );
};

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
});

export default LoginScreen;
