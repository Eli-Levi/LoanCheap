import {Alert} from 'react-native';
import {API_URL} from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getUserToken() {
  return AsyncStorage.getItem('userToken').then(value => {
    return value;
  });
}

export async function addLoan(loanNam, amount, loanRepayment, info, interest) {
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
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
    let res = fetch(`${API_URL}/api/admin/addloan`, requestParameters)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {});
          console.log('loan added successfully');
          return true;
        } else {
          console.log('Error creating loan');
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
