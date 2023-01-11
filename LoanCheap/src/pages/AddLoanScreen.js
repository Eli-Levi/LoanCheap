import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { AuthContext } from "../../App";
import { addLoan } from "../services/addloan";
const AddLoanScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  const [loanName, onChangeLoanName] = useState(null);
  const [amount, onChangeAmount] = useState(null);
  const [loanRepayment, onChangeLoanRepayment] = useState(null);
  const [info, onChangeInfo] = useState(null);
  const [interest, onChangeInterest] = useState(null);
  const [validated, setValidated] = useState(false);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Loan Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLoanName}
          value={loanName}
          placeholder="Type the loan name"
          placeholderTextColor="#05445E"
        />
        <Text style={styles.text}>Amount</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          value={amount}
          placeholder="Type the loan amount"
          placeholderTextColor="#05445E"
          keyboardType="numeric"
        />
        <Text style={styles.text}>Interest</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInterest}
          value={interest}
          placeholder="Type the loan interest"
          keyboardType="numeric"
          placeholderTextColor="#05445E"
        />
        <Text style={styles.text}>Loan Repayment</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLoanRepayment}
          value={loanRepayment}
          placeholder="Type the Loan Repayment"
          placeholderTextColor="#05445E"
          keyboardType="numeric"
        />
        <Text style={styles.text}>Loan Info</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInfo}
          value={info}
          placeholder="Type Loan information"
          placeholderTextColor="#05445E"
        />
      </SafeAreaView>
      <View style={styles.fixToText}>
        {validated ? (
          <Text style={styles.validate}>
            Please make sure that you fill every field
          </Text>
        ) : null}

        <Button
          color="#05445E"
          title="Add Loan"
          onPress={async () => {
            if (
              loanName !== null &&
              amount !== null &&
              interest !== null &&
              loanRepayment !== null &&
              interest !== null &&
              info !== null
            ) {
              try {
                setValidated(false);
                let data = await addLoan(
                  loanName,
                  amount,
                  loanRepayment,
                  info,
                  interest
                );
                if (data === true) {
                  navigation.navigate("AdminLoans");
                } else {
                  Alert.alert("Please try again");
                }
              } catch (error) {
                console.error(error);
              }
            } else {
              setValidated(true);
            }
          }}
        />
      </View>
    </View>
  );
};

export default AddLoanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 16,
    color: "#05445E",
    fontWeight: "bold",
  },
  input: {
    marginTop: 2,
    marginBottom: 2,
    color: "#05445E",
    textAlign: "left",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#05445E",
  },
  fixToText: {
    marginTop: 10,
  },
  validate: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
});
