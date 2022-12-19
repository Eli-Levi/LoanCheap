import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import React, { useState, useEffect } from "react";
import { FAB } from "@rneui/themed";
import { getalladminloans } from "../services/admin";
import AsyncStorage from "@react-native-async-storage/async-storage";

// EditScreen
const AdminScreen = ({ navigation }) => {
  const [currPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loans, setLoans] = useState(null);
  // let data = ;
  const [data, setData] = useState({
    tableHead: ["Name", "Amount", "Edit"],
    tableData: [],
  });
  const EditELement = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("EditScreen", { loan: data.loanId })}
      >
        <View style={styles.text}>
          <Text style={styles.btn}>Edit</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const get = async () => {
    let currPageTemp = await AsyncStorage.getItem("AdminScreenCurrPage");
    console.log(currPageTemp);
    if (currPageTemp === null) {
      setCurrentPage(1);
    }
  };

  const getFetchData = async () => {
    let fetchData = await getalladminloans(currPage, 5);
    setTotalPages(fetchData.totalPages);
    setLoans(fetchData.loans);
    length = loans.length || 0;
    let temp = [];
    for (let index = 0; index < length; index++) {
      let loanId = loans[index]?._id;
      temp.push([
        loans[index]?.name,
        loans[index]?.amount,
        <EditELement data={loanId} />,
      ]);
    }
    setData({
      tableHead: ["Name", "Amount", "Edit"],
      tableData: temp,
    });
    console.log("fetch successfully");
  };
  useEffect(() => {
    getFetchData();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.baseText}>Added loans</Text>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row data={data.tableHead} style={styles.head} />
            <Rows data={data.tableData} style={styles.head} />
          </Table>
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
    paddingTop: 30,
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
