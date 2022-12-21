import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { Text, Card, Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { searchLoans } from "../services/searchloans";
import { loanRequest } from "../services/loanrequest";
const FindLoansScreen = ({ route, navigation }) => {
  const [currPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loans, setLoans] = useState(null);
  const { name, minAmount, maxAmount, interest, loanRepayment } = route.params;

  const getFetchData = async (currentPage) => {
    try {
      let fetchData = await searchLoans(
        currentPage,
        5,
        name,
        minAmount,
        maxAmount,
        interest,
        loanRepayment
      );
      setTotalPages(fetchData.totalPages || 0);
      setLoans(fetchData.loans || []);
      setCurrentPage(fetchData.currentPage);
      console.log("fetch successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFetchData(currPage);
  }, [currPage]);
  return (
    <ScrollView>
      <View>
        {loans?.map((u, i) => {
          const loan = u?._id;
          const admin = u?.admin;
          return (
            <Card>
              <Card.Title>{u?.name}</Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>Amount: {u?.amount}</Text>
              <Text style={{ marginBottom: 10 }}>Interest: {u?.interest}</Text>
              <Text style={{ marginBottom: 10 }}>
                Loan Repayment: {u?.loanRepayment}
              </Text>
              <Text style={{ marginBottom: 10 }}>More Info: {u?.info}</Text>
              <TouchableOpacity
                onPress={() => {
                  try {
                    if (loanRequest(loan, admin)) {
                      Alert.alert("Request submited successfully!");
                    } else {
                      Alert.alert("Please try again later");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <View style={styles.text}>
                  <Text style={styles.btnSubmit}>Submit A Request</Text>
                </View>
              </TouchableOpacity>
            </Card>
          );
        })}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              let currentPage = currPage;
              currentPage--;
              if (currentPage > 0 && currentPage <= totalPages) {
                setCurrentPage(currentPage);
              }
            }}
          >
            <View style={styles.text}>
              <Text style={styles.btn}>Prev</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, textAlignVertical: "center" }}>
            {currPage}
          </Text>
          <TouchableOpacity
            onPress={() => {
              let currentPage = currPage;
              currentPage++;
              if (currentPage <= totalPages) {
                setCurrentPage(currentPage);
              }
            }}
          >
            <View style={styles.text}>
              <Text style={styles.btn}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FindLoansScreen;

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
  text: { margin: 6, fontSize: 25 },
  btn: {
    width: 180,
    height: 40,
    backgroundColor: "#05445E",
    borderRadius: 45,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    color: "#fff",
  },
  btnSubmit: {
    height: 30,
    backgroundColor: "#05445E",
    borderRadius: 45,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    color: "#fff",
  },
});
