import React, { useState, useEffect } from "react";
import type { Node } from "react";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";
import SignUpScreen from "./src/pages/SignUpScreen";
import AdminScreen from "./src/pages/AdminScreen";
import AddLoanScreen from "./src/pages/AddLoanScreen";
import EditScreen from "./src/pages/EditScreen";
import axios from "axios";
// change to you'r ip
const API_URL = "http://10.0.0.19:8080";

const Stack = createNativeStackNavigator();
const AuthContext = React.createContext();
export { AuthContext };

const App: () => Node = ({ navigation }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            isAdmin: action.admin,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isAdmin: action.admin,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isAdmin: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isAdmin: false,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let admin;
      let adminBool;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        admin = await AsyncStorage.getItem("isAdmin");
        console.log(admin);
        if (admin === "admin") {
          adminBool = true;
        } else {
          adminBool = false;
        }
      } catch (e) {
        // Restoring token failed
      }
      // TODO: validate the token.
      dispatch({ type: "RESTORE_TOKEN", token: userToken, admin: adminBool });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        const requestParameters = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email, password: data.password }),
        };
        let token;
        try {
          await fetch(`${API_URL}/api/auth/signin`, requestParameters)
            .then((response) => {
              if (response.ok) {
                response.json().then((data) => {
                  let isAdminBool = false;
                  if (data.roles === "admin") {
                    isAdminBool = true;
                    AsyncStorage.setItem("isAdmin", "admin");
                  }
                  AsyncStorage.setItem(
                    "userToken",
                    data.accessToken.toString()
                  );
                  dispatch({
                    type: "SIGN_IN",
                    token: data.accessToken,
                    admin: isAdminBool,
                  });
                });
              } else {
                Alert.alert("Error signing in: please try again");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error(error);
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("isAdmin");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        const requestParameters = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
            .then((response) => {
              Alert.alert(JSON.stringify(response));
              if (response.ok) {
                response.json().then((data) => {
                  Alert.alert(
                    "account created successfully, please go  back to log in",
                    JSON.stringify(data)
                  );
                  dispatch({ type: "SIGN_IN", token: null });
                });
              } else {
                Alert.alert("Error signing up: please try again");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          Alert.alert(error);
          console.error(error);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#05445E",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerShadowVisible: false,
          }}
        >
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              {state.isAdmin == true ? (
                <>
                  <Stack.Screen
                    name="Admin"
                    component={AdminScreen}
                    options={{ title: "Dashboard" }}
                  />
                  <Stack.Screen
                    name="AddLoan"
                    component={AddLoanScreen}
                    options={{ title: "Add Loan" }}
                  />
                  <Stack.Screen
                    name="EditScreen"
                    component={EditScreen}
                    options={{ title: "Edit Loan" }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
