import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../../components/styledComponents";
const Expense: FC = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>Expense Summary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Expense;
