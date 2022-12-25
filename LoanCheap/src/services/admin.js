import { Alert } from "react-native";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getalladminloans(currPage, limit) {
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  try {
    const params = { page: currPage, limit: limit };
    let res = fetch(
      `${API_URL}/api/admin/getalladminloans?page=${currPage}&limit=${limit}`,
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
