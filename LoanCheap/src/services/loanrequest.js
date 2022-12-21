import { Alert } from "react-native";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loanRequest(loan, admin) {
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
      admin: admin,
      loan: loan,
    }),
  };
  try {
    let res = fetch(`${API_URL}/api/user/request`, requestParameters)
      .then((response) => {
        if (response.ok) {
          let res = response.json().then((data) => {
            return data;
          });
          return true;
        } else {
          console.log("Error fetching loan");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Success");
    return true;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}
