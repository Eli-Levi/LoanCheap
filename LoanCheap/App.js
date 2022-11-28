import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';
import SignUpScreen from './src/pages/SignUpScreen';
import axios from 'axios';
// change to you'r ip
const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:8080' : 'http://10.0.0.19:8080';

const Stack = createNativeStackNavigator();
const AuthContext = React.createContext();
export {AuthContext};

const App: () => Node = ({navigation}) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      // TODO: validate the token.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        const requestParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: data.email, password: data.password}),
        };
        let token;
        try {
          await fetch(`${API_URL}/api/auth/signin`, requestParameters)
            .then(response => {
              if (response.ok) {
                response.json().then(data => {
                  AsyncStorage.setItem('userToken', data.accessToken);
                  dispatch({type: 'SIGN_IN', token: data.accessToken});
                });
              } else {
                Alert.alert('Error signing in: please try again');
              }
            })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          console.error(error);
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        const requestParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password,
            roles: data.role,
            bank: data.bankName,
            files: data.filesLink,
          }),
        };
        try {
          await fetch(`${API_URL}/api/auth/signup`, requestParameters)
            .then(response => {
              Alert.alert(JSON.stringify(response));
              if (response.ok) {
                response.json().then(data => {
                  Alert.alert(
                    'account created successfully, please go  back to log in',
                    JSON.stringify(data),
                  );
                  dispatch({type: 'SIGN_IN', token: null});
                });
              } else {
                Alert.alert('Error signing up: please try again');
              }
            })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          Alert.alert(error);
          console.error(error);
        }
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{headerShown: false}}
              />
            </>
          ) : (
            // User is signed in
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
