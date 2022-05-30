import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import ExpenseCard from "../../components/expenseCard";
import { ScrollView, Text, View } from "../../components/styledComponents";
import useToken from "../../hooks/useToken";
import { createType, RootStackParamList } from "../../navigation/Stack";
import UseExpenses from "../../swr/useExpenses";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const Expense: FC<Props> = ({ navigation }) => {
  const { token } = useToken();
  const { expenses, isLoading, isError } = UseExpenses({ token });

  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>Expense Summary</Text>
      <ScrollView scrollEnabled>
        {isLoading && <Text>...Loading</Text>}
        {isError && <Text>...Error</Text>}
        {expenses?.map((expense) => {
          return (
            <ExpenseCard
              expense={expense}
              key={expense._id}
              edit={() => {
                navigation.navigate("Create", {
                  expense: expense,
                  type: createType.EXPENSE,
                });
              }}
            />
          );
        })}
      </ScrollView>
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
