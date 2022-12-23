import { Alert } from "react-native";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getContactInfo(user) {
  let token;
  try {
    token = await AsyncStorage.getItem("userToken");
  } catch (e) {
    console.log(e);
  }
  if (token === null) {
    return;
  }
  const requestParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      user: user,
    }),
  };
  try {
    let res = fetch(`${API_URL}/api/admin/getcontactinfo`, requestParameters)
      .then((response) => {
        if (response.ok) {
          let res = response.json().then((data) => {
            return data;
          });
          return res;
        } else {
          console.log("Error fetching requests");
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
