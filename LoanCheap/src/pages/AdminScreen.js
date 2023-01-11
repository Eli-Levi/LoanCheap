import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
  Linking,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import React, { useState, useEffect, useCallback } from "react";
import { FAB } from "@rneui/themed";
import { getalladminloans } from "../services/admin";
import { getAllRequests } from "../services/getallrequests";
import { changeRequestStatus } from "../services/changerequeststatus";
import { getContactInfo } from "../services/getcontactinfo";
import EditElement from "../components/EditElement";
import { useIsFocused } from "@react-navigation/native";
const AdminScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [currPageLoans, setCurrentPageLoans] = useState(1);
  const [totalPagesLoans, setTotalPagesLoans] = useState(null);
  const [loans, setLoans] = useState(null);
  const [reload, setReload] = useState(1);
  // let data = ;
  const [dataLoans, setDataLoans] = useState({
    tableHead: ["Name", "Amount", "Edit"],
    tableData: [],
  });

  const [currPageRequests, setCurrentPageRequests] = useState(1);
  const [totalPagesRequests, setTotalPagesRequests] = useState(null);
  const [requests, setRequests] = useState(null);
  // let data = ;
  const [dataRequests, setDataRequests] = useState({
    tableHead: [],
    tableData: [],
  });

  const getFetchData = async (currentPageLoan, currentPageRequest) => {
    let fetchData = null;
    fetchData = await getalladminloans(currentPageLoan, 5);
    setTotalPagesLoans(fetchData?.totalPages || 0);
    length = loans?.length || 0;
    let temp = [];
    for (let index = 0; index < fetchData?.loans.length; index++) {
      let name = fetchData?.loans[index]?.name;
      let amount = fetchData?.loans[index]?.amount;
      let interest = fetchData?.loans[index]?.interest;
      let loanRepayment = fetchData?.loans[index]?.loanRepayment;
      let info = fetchData?.loans[index]?.info;
      temp.push([
        fetchData?.loans[index]?.name,
        fetchData?.loans[index]?.amount,
        <EditElement
          name={name}
          amount={amount}
          interest={interest}
          loanRepayment={loanRepayment}
          info={info}
        />,
      ]);
    }
    setLoans(fetchData?.loans || 0);
    setDataLoans({
      tableHead: ["Name", "Amount", "Edit"],
      tableData: temp,
    });

    fetchData = await getAllRequests(currentPageRequest, 5, "admin");

    setTotalPagesRequests(fetchData?.totalPages || 0);
    length = loans?.length || 0;
    temp = [];
    for (let index = 0; index < fetchData?.requests?.length; index++) {
      let loanId = fetchData.requests[index]?._id;
      temp.push([
        fetchData?.requests[index]?.details,
        fetchData?.requests[index]?.status,
        fetchData?.requests[index]?.date,
        <TouchableOpacity
          onPress={async () => {
            let contact = await getContactInfo(
              fetchData?.requests[index]?.costumers
            );
            let name = contact?.user[0]?.name;
            let email = contact?.user[0]?.email;
            let phone = contact?.user[0]?.phoneNumber;
            Alert.alert(
              "Contact info",
              "Name: " +
                name +
                "\n" +
                "Email: " +
                email +
                "\n" +
                "Phone: " +
                phone +
                "\n",
              [
                {
                  text: "Call now",
                  onPress: async () => {
                    const telephone = "tel:+972" + phone;
                    await Linking.openURL(telephone);
                  },
                },
                {
                  text: "Send an Email",
                  onPress: async () => {
                    const emailTo = "mailto:" + email;
                    await Linking.openURL(emailTo);
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]
            );
          }}
        >
          <View style={styles.text}>
            <Text style={styles.btn}>Contact</Text>
          </View>
        </TouchableOpacity>,
        <View>
          <TouchableOpacity
            onPress={() => {
              if (fetchData?.requests[index]?.status === "Pending") {
                changeRequestStatus(
                  fetchData?.requests[index]?._id,
                  "Rejected"
                );
                setCurrentPageRequests(1);
                setReload(reload + 1);
              }
            }}
          >
            <View style={styles.text}>
              <Text style={styles.btn}>Reject</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (fetchData?.requests[index]?.status === "Pending") {
                changeRequestStatus(
                  fetchData?.requests[index]?._id,
                  "Accepted"
                );
                setCurrentPageRequests(1);
                setReload(reload + 1);
              }
            }}
          >
            <View style={styles.text}>
              <Text style={styles.btn}>Accept</Text>
            </View>
          </TouchableOpacity>
        </View>,
      ]);
    }

    setRequests(fetchData.loans || 0);
    setDataRequests({
      tableHead: [
        "Details",
        "Request Status",
        "Date",
        "Contact",
        "Accept or Reject",
      ],
      tableData: temp,
    });
    setCurrentPageRequests(currentPageRequest);
    setCurrentPageLoans(currentPageLoan);
    console.log("Requests fetched successfully");
  };
  useEffect(() => {
    getFetchData(currPageLoans, currPageRequests);
  }, [currPageLoans, currPageRequests, reload, isFocused]);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.baseText}>Requests</Text>
          <Table
            borderStyle={{
              ...{
                borderWidth: 2,
                borderColor: "#c8e1ff",
              },
            }}
          >
            <Row data={dataRequests?.tableHead} style={{ ...styles.head }} />
            <Rows
              data={dataRequests?.tableData}
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
                let currentPage = currPageRequests;
                currentPage--;
                if (currentPage > 0 && currentPage <= totalPagesRequests) {
                  setCurrentPageRequests(currentPage);
                }
              }}
            >
              <View style={styles.text}>
                <Text style={styles.btn}>Prev</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{currPageRequests}</Text>
            <TouchableOpacity
              onPress={() => {
                let currentPage = currPageRequests;
                currentPage++;
                if (currentPage <= totalPagesRequests) {
                  setCurrentPageRequests(currentPage);
                }
              }}
            >
              <View style={styles.text}>
                <Text style={styles.btn}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <FAB
          visible={true}
          color="green"
          title="Add Loan"
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
  head: { backgroundColor: "#f1f8ff" },
  text: { margin: 6, fontSize: 13.5 },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 45,
    textAlign: "center",
  },
});
