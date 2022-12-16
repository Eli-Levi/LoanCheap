import {Alert} from 'react-native';
import API_URL from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getUserToken() {
  return AsyncStorage.getItem('userToken').then(value => {
    return value;
  });
}

export async function getalladminloans(currPage, limit) {
  let token;
  try {
    token = await AsyncStorage.getItem('userToken');
  } catch (e) {
    console.log(e);
  }
  if (token === null) {
    return;
  }
  const requestParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({}),
  };
  try {
    let res = fetch(`${API_URL}/api/admin/getalladminloans?page=${currPage}&limit=${limit}}}`, requestParameters)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {});
          return true;
        } else {
          console.log('Error fetching loan');
        }
      })
      .catch(error => {
        console.log(error);
      });
    return res;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}
