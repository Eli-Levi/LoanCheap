import { Alert } from "react-native";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function genericHttpRequest(method, body, url) {
  let token;
  try {
    token = await AsyncStorage.getItem("userToken");
  } catch (e) {
    console.log("error:" + e);
  }
  if (token === null) {
    return;
  }
  const requestParameters = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    // body: JSON.stringify(body),
  };
  try {
    
    let res = fetch(`${API_URL}/${url}`, requestParameters)
      .then((response) => {
        if (response.ok) {
          let res = response.json().then((data) => {
            console.log(data);
            return data;
          });
          return res;
        } else {
          console.log("Error fetching");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}
