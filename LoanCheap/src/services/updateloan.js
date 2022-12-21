import { Alert } from "react-native";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function updateLoan(
  loanNam,
  amount,
  loanRepayment,
  info,
  interest
) {
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
      name: loanNam,
      amount: amount,
      interest: interest,
      loanRepayment: loanRepayment,
      info: info,
    }),
  };
  console.log(API_URL);
  try {
    let res = fetch(`${API_URL}/api/admin/editloan`, requestParameters)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {});
          console.log("loan updated successfully");
          return true;
        } else {
          console.log("Error updating loan");
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
