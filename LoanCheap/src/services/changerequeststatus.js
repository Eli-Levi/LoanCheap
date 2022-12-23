import { Alert } from "react-native";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function changeRequestStatus(request, status) {
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
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      request: request,
      status: status,
    }),
  };
  try {
    let res = fetch(`${API_URL}/api/changeRequestStatus`, requestParameters)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {});
          console.log("request updated successfully");
          return true;
        } else {
          console.log("Error updating request");
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
