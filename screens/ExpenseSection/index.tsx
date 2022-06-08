import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import CategoryTag from "../../components/CategoryTag";
import ExpenseCard from "../../components/expenseCard";
import {
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "../../components/styledComponents";
import useToken from "../../hooks/useToken";
import { categoryInterface } from "../../interfaces/categories";
import { expenseInterface } from "../../interfaces/expenses";
import { createType, RootStackParamList } from "../../navigation/Stack";
import { deleteExpense } from "../../requests/expense";
import UseCategories from "../../swr/useCategories";
import UseExpenses from "../../swr/useExpenses";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const Expense: FC<Props> = ({ navigation }) => {
  const { token } = useToken();
  const { expenses, isLoading, isError } = UseExpenses({ token });
  const { categories } = UseCategories({ token });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const onSelectCategory = (categoryId: string) => {
    let categoriesSelected = selectedCategories;
    const category = selectedCategories?.find((cate) => cate === categoryId);
    if (category)
      categoriesSelected = categoriesSelected.filter(
        (cat) => cat !== categoryId
      );
    else categoriesSelected = [...categoriesSelected, categoryId];

    setSelectedCategories(categoriesSelected);
  };
  const categoriesFilter = (expense: expenseInterface) => {
    if (!selectedCategories.length) return true;

    return selectedCategories.includes(expense.category);
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        scrollEnabled
        horizontal
        style={[{ marginVertical: 10, height: 40 }]}
      >
        {categories?.map((category) => {
          return (
            category.name && (
              <TouchableOpacity
                onPress={() => onSelectCategory(category._id)}
                style={[{ marginHorizontal: 10 }]}
                key={category?._id}
              >
                <CategoryTag
                  category={category}
                  active={selectedCategories.includes(category._id)}
                />
              </TouchableOpacity>
            )
          );
        })}
        <CategoryTag
          category={{ _id: "1", name: "+" }}
          fontSize="15"
          color="lightblue"
        />
      </ScrollView>
      <ScrollView scrollEnabled style={[styles.scrollView]}>
        {isLoading && <Text>...Loading</Text>}
        {isError && <Text>...Error</Text>}
        {expenses?.filter(categoriesFilter)?.map((expense) => {
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
