import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import ExpenseCard from "../../components/expenseCard";
import {
  Button,
  ScrollView,
  Text,
  View,
} from "../../components/styledComponents";
import useToken from "../../hooks/useToken";
import { createType, RootStackParamList } from "../../navigation/Stack";
import { deleteExpense } from "../../requests/expense";
import UseExpenses from "../../swr/useExpenses";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const Expense: FC<Props> = ({ navigation }) => {
  const { token } = useToken();
  const { expenses, isLoading, isError } = UseExpenses({ token });

  return (
    <View style={[styles.container]}>
      <ScrollView scrollEnabled style={[styles.scrollView]}>
        {isLoading && <Text>...Loading</Text>}
        {isError && <Text>...Error</Text>}
        {expenses?.map((expense) => {
          return (
            <View key={expense?._id} style={[styles.cardItem]}>
              <ExpenseCard
                width="100%"
                showIcons
                expense={expense}
                onDelete={() => {
                  deleteExpense({ expenseId: expense._id, token: token });
                }}
                edit={() => {
                  navigation.navigate("Create", {
                    expense: expense,
                    type: createType.EXPENSE,
                  });
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate("Create", { type: createType.EXPENSE });
          }}
          title="create expenses"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    marginBottom: 20,
  },
  buttonStyle: {
    width: "90%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardItem: {
    marginVertical: 10,
    width: "90%",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  scrollView: {
    alignItems: "center",
  },
});

export default Expense;
