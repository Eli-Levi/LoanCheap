import { Alert } from "react-native";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function searchLoans(
  currPage,
  limit,
  name,
  minAmount,
  maxAmount,
  interest,
  loanRepayment
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      name: name,
      minAmount: minAmount,
      maxAmount: maxAmount,
      interest: interest,
      loanRepayment: loanRepayment,
    }),
  };
  try {
    const params = { page: currPage, limit: limit };
    let res = fetch(
      `${API_URL}/api/user/findloans?page=${currPage}&limit=${limit}`,
      requestParameters
    )
      .then((response) => {
        if (response.ok) {
          let res = response.json().then((data) => {
            return data;
          });
          return res;
        } else {
          console.log("Error fetching loan");
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
