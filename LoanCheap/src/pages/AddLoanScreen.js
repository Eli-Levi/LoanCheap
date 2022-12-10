import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {AuthContext} from '../../App';
import {addLoan} from '../services/addloan';
const AddLoanScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [loanName, onChangeLoanName] = useState(null);
  const [amount, onChangeAmount] = useState(null);
  const [loanRepayment, onChangeLoanRepayment] = useState(null);
  const [info, onChangeInfo] = useState(null);
  const [interest, onChangeInterest] = useState(null);
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
        />
        <Text style={styles.text}>Interest</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInterest}
          value={interest}
          placeholder="Type the loan interest"
          placeholderTextColor="#05445E"
        />
        <Text style={styles.text}>Loan Repayment</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLoanRepayment}
          value={loanRepayment}
          placeholder="Type the Loan Repayment"
          placeholderTextColor="#05445E"
        />
        <Text style={styles.text}>Loan Info</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInfo}
          value={info}
          placeholder="Type your bank name"
          placeholderTextColor="#05445E"
        />
      </SafeAreaView>
      <View style={styles.fixToText}>
        <Button
          color="#05445E"
          title="Add Loan"
          onPress={() =>
            addLoan(loanName, amount, loanRepayment, info, interest)
          }
        />
      </View>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

export default AddLoanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 16,
    color: '#05445E',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 2,
    marginBottom: 2,
    color: '#05445E',
    textAlign: 'left',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#05445E',
  },
  fixToText: {
    marginTop: 10,
  },
});
