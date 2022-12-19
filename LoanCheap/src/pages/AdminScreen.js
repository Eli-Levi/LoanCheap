/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import React from 'react';
import {FAB} from '@rneui/themed';

const AdminScreen = ({navigation}) => {
  let data = {
    tableHead: ['Name', 'Amount', 'Edit'],
    tableData: [
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['a', 'b', 'c'],
      ['a', 'b', 'c'],
    ],
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={data.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={data.tableData} textStyle={styles.text} />
          </Table>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={data.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={data.tableData} textStyle={styles.text} />
          </Table>
        </ScrollView>
        <FAB
          visible={true}
          color="green"
          title="Add a new loan"
          onPress={() => navigation.navigate('AddLoan')}
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
    backgroundColor: '#fff',
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
