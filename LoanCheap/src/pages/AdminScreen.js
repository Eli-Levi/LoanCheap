import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import React, { useState, useEffect, useCallback } from "react";
import { FAB } from "@rneui/themed";
import { getalladminloans } from "../services/admin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditElement from "../components/EditElement";

// EditScreen
const AdminScreen = ({ navigation }) => {
  const [currPageLoans, setCurrentPageLoans] = useState(1);
  const [totalPagesLoans, setTotalPagesLoans] = useState(null);
  const [loans, setLoans] = useState(null);
  // let data = ;
  const [dataLoans, setDataLoans] = useState({
    tableHead: ["Name", "Amount", "Edit"],
    tableData: [],
  });

  const get = async () => {
    let currPageTemp = await AsyncStorage.getItem("AdminScreenCurrPage");
    console.log(currPageTemp);
    if (currPageTemp === null) {
      setCurrentPageLoans(1);
    }
  };
  const getFetchData = async (currentPage) => {
    let fetchData = await getalladminloans(currentPage, 5);
    setTotalPagesLoans(fetchData.totalPages || 0);
    length = loans?.length || 0;
    let temp = [];
    for (let index = 0; index < fetchData.loans.length; index++) {
      let loanId = fetchData.loans[index]?._id;
      temp.push([
        fetchData.loans[index]?.name,
        fetchData.loans[index]?.amount,
        <EditElement data={loanId} />,
      ]);
    }
    setLoans(fetchData.loans || 0);
    setDataLoans({
      tableHead: ["Name", "Amount", "Edit"],
      tableData: temp,
    });
    setCurrentPageLoans(fetchData.currentPage);
    console.log("fetch successfully");
  };
  useEffect(() => {
    getFetchData(currPageLoans);
  }, [currPageLoans]);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.baseText}>Added Loans</Text>
          <Table
            borderStyle={{
              ...{
                borderWidth: 2,
                borderColor: "#c8e1ff",
              },
            }}
          >
            <Row data={dataLoans?.tableHead} style={{ ...styles.head }} />
            <Rows
              data={dataLoans?.tableData}
              style={{ ...styles.head }}
              textStyle={{ ...styles.text }}
            />
          </Table>
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
                let currentPage = currPageLoans;
                currentPage--;
                if (currentPage > 0 && currentPage <= totalPages) {
                  setCurrentPageLoans(currentPage);
                }
              }}
            >
              <View style={styles.text}>
                <Text style={styles.btn}>Prev</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{currPageLoans}</Text>
            <TouchableOpacity
              onPress={() => {
                let currentPage = currPageLoans;
                currentPage++;
                if (currentPage <= totalPages) {
                  setCurrentPageLoans(currentPage);
                }
              }}
            >
              <View style={styles.text}>
                <Text style={styles.btn}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.baseText}>Requests</Text>
        </ScrollView>
        <FAB
          visible={true}
          color="green"
          title="Add a new loan"
          onPress={() => navigation.navigate("AddLoan")}
          placement="bottom"
        />
      </SafeAreaView>
    </>
  );
};

export default AdminScreen;

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
