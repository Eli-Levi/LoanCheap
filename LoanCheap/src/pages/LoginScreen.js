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

const LoginScreen = () => {
  const [email, onChangeEmail] = useState('Email Address');
  const [password, onChangePassword] = useState(null);
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
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#D4F1F4"
          />
        </SafeAreaView>
        <TouchableHighlight>
          <View>
            <Text style={styles.createButton}>
              Don't have an account? sign up
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.fixToText}> 
          <Button
            color="#000000"
            title="Login"
            onPress={() => Alert.alert('Login buttom pressed')}
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
    backgroundColor: '#003060',
  },
  titleLogo: {
    marginTop: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#D4F1F4',
    borderRadius: 6,
    color: '#D4F1F4',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 24,
    borderRadius: 6,
    color: '#D4F1F4',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#D4F1F4',
    textAlign: 'left',
    fontSize: 16,
  },
  input: {
    marginTop: 24,
    color: '#D4F1F4',
    textAlign: 'left',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#D4F1F4',
  },
  createButton: {
    marginTop: 10,
    color: '#D4F1F4',
    textAlign: 'left',
    fontSize: 16,
  },
  fixToText: {
    marginTop: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});

export default LoginScreen;
