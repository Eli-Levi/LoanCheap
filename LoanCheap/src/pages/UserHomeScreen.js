import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../../App";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dialog, Input, CheckBox, ListItem, Avatar, FAB } from "@rneui/themed";
const UserHomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  const [search, setSearch] = useState(false);
  const [ name, setName ] = useState(null);
  const [ min, setMin ] = useState(null);
  const [ max, setMax ] = useState(null);
  const [ interest, setInterest ] = useState(null);
  const [ loanRepayment, setLoanRepayment ] = useState(null);

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={signOut} />
      <Text style={styles.text}>Table for submited requests</Text>
      <Dialog isVisible={search} onBackdropPress={() => setSearch(false)}>
        <Dialog.Title title="Search For Loans" />
        <Input onChangeText={setName} value={name} placeholder="Loan Name" />
        <Input
          keyboardType="numeric"
          value={min}
          onChangeText={setMin}
          placeholder="Minimum amount"
        />
        <Input
          keyboardType="numeric"
          value={max}
          onChangeText={setMax}
          placeholder="Maximum amount"
        />
        <Input
          value={interest}
          onChangeText={setInterest}
          keyboardType="numeric"
          placeholder="Interest"
        />
        <Input
          value={loanRepayment}
          onChangeText={setLoanRepayment}
          keyboardType="numeric"
          placeholder="Loan Repayment"
        />
        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={() => {
              console.log("name="+search);
              setSearch(false);
              navigation.navigate("FindLoans", {
                name: name,
                minAmount: min,
                maxAmount: max,
                interest: interest,
                loanRepayment: loanRepayment,
              });
            }}
          />
          <Dialog.Button title="CANCEL" onPress={() => setSearch(false)} />
        </Dialog.Actions>
      </Dialog>
      <FAB
        visible={true}
        color="green"
        title="Look for loans"
        onPress={() => setSearch(true)}
        placement="bottom"
      />
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  baseText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#05445E",
    marginBottom: 10,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 45,
    textAlign: "center",
  },
});
