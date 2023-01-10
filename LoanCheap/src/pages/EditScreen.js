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
import React, { useState } from "react";
import {updateLoan} from "../services/updateloan";

export default function EditScreen({ route, navigation }) {
  // const { loan } = ;
  const [loanName, onChangeLoanName] = useState(
    route.params.props.name.toString()
  );
  const [amount, onChangeAmount] = useState(
    route.params.props.amount.toString()
  );
  const [loanRepayment, onChangeLoanRepayment] = useState(
    route.params.props.loanRepayment.toString()
  );
  const [info, onChangeInfo] = useState(route.params.props.info.toString());
  const [interest, onChangeInterest] = useState(
    route.params.props.interest.toString()
  );
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
          editable={false}
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
          title="Edit Loan"
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
                let data = await updateLoan(
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
}

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
