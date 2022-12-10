import {Alert} from 'react-native';
import API_URL from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getUserToken() {
  return AsyncStorage.getItem('userToken').then(value => {
    return value;
  });
}

export async function addLoan(loanNam, amount, loanRepayment, info, interest) {
  let token = await getUserToken();
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
  try {
    fetch(`http://10.0.0.19:8080/api/admin/addloan`, requestParameters)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            console.log(JSON.stringify(data));
            Alert.alert("Loan added successfully");
          });
        } else {
          console.log('Error creating loan');
          Alert.alert("Please choose a differnet loan name")
        }
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}
