import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AuthContext } from "../../App";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dialog, Input, CheckBox, ListItem, Avatar, FAB } from "@rneui/themed";
import { Table, Row, Rows } from "react-native-table-component";
import { getAllRequests } from "../services/getallrequests";
import { changeRequestStatus } from "../services/changerequeststatus";
const UserHomeScreen = ({ navigation }) => {
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState(false);
  const [name, setName] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [interest, setInterest] = useState(null);
  const [loanRepayment, setLoanRepayment] = useState(null);
  const [currPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [requests, setRequests] = useState(null);
  const [table, setTable] = useState({
    tableHead: [],
    tableData: [],
  });
  const getFetchData = async (currentPage) => {
    try {
      let fetchData = await getAllRequests(currentPage, 6, "user");
      setTotalPages(fetchData?.totalPages || 0);
      console.log(fetchData?.requests?.length);
      let temp = [];
      for (let index = 0; index < fetchData?.requests?.length; index++) {
        let loanId = fetchData.requests[index]?._id;
        temp.push([
          fetchData?.requests[index]?.details,
          fetchData?.requests[index]?.status,
          fetchData?.requests[index]?.date,
          <TouchableOpacity
            onPress={() => {
              if (fetchData?.requests[index]?.status !== "Canceled") {
                changeRequestStatus(fetchData?.requests[index]._id, "Canceled");
                setCurrentPage(currentPage);
                setReload(reload + 1);
              }
            }}
          >
            <View style={styles.text}>
              <Text style={styles.btn}>Cancel</Text>
            </View>
          </TouchableOpacity>,
        ]);
      }
      setRequests(fetchData?.requests || 0);
      setTable({
        tableHead: ["Details", "Request Status", "Submition date", "Cancel"],
        tableData: temp,
      });
      setCurrentPage(fetchData?.currentPage);
      console.log("fetch successfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFetchData(currPage);
  }, [currPage, reload]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.baseText}>Requests</Text>
        <Text style={styles.text}>
          All requests will be answered in 5 business days from the day the
          request was made
        </Text>
        <Table
          borderStyle={{
            ...{
              borderWidth: 2,
              borderColor: "#c8e1ff",
            },
          }}
        >
          <Row data={table?.tableHead} style={{ ...styles.head }} />
          <Rows
            data={table?.tableData}
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
          <Text style={{ fontSize: 20 }}>{currPage}</Text>
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
      </ScrollView>
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
              if (name === "") {
                console.log("name=" + name + "name");
                setName(null);
              }
              setSearch(false);
              console.log(name);
              navigation.navigate("FindLoans", {
                name: name,
                minAmount: min,
                maxAmount: max,
                interest: interest,
                loanRepayment: loanRepayment,
              });
            }}
          />
          <Dialog.Button
            title="CANCEL"
            onPress={() => {
              setSearch(false);
              setReload(reload + 1);
            }}
          />
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
  head: { backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 45,
    textAlign: "center",
  },
});
