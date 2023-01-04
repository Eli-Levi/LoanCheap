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


const AdminLoanScreen = () => {
    const isFocused = useIsFocused();
    const [currPageLoans, setCurrentPageLoans] = useState(1);
    const [totalPagesLoans, setTotalPagesLoans] = useState(null);
    const [loans, setLoans] = useState(null);
    const [reload, setRelaod] = useState(1);
    // let data = ;
    const [dataLoans, setDataLoans] = useState({
      tableHead: ["Name", "Amount", "Edit"],
      tableData: [],
    });

    const getFetchData = async (currentPageLoan) => {
        let fetchData = null;
        fetchData = await getalladminloans(currentPageLoan, 15);
        setTotalPagesLoans(fetchData?.totalPages || 0);
        let temp = [];
        for (let index = 0; index < fetchData?.loans.length; index++) {
          let loanId = fetchData?.loans[index]?._id;
          temp.push([
            fetchData?.loans[index]?.name,
            fetchData?.loans[index]?.amount,
            <EditElement data={loanId} />,
          ]);
        }
        setLoans(fetchData?.loans || 0);
        setDataLoans({
          tableHead: ["Name", "Amount", "Edit"],
          tableData: temp,
        });
        setCurrentPageLoans(currentPageLoan);
        console.log("Requests fetched successfully");
      };
      useEffect(() => {
        getFetchData(currPageLoans);
      }, [currPageLoans, reload, isFocused]);
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
                if (currentPage > 0 && currentPage <= totalPagesLoans) {
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
                if (currentPage <= totalPagesLoans) {
                  setCurrentPageLoans(currentPage);
                }
              }}
            >
              <View style={styles.text}>
                <Text style={styles.btn}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default AdminLoanScreen;






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