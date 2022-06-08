import { View, Text, ScrollView } from "../../components/styledComponents";
import { StyleSheet } from "react-native";
import useEntries from "../../swr/useEntries";
import useExpenses from "../../swr/useExpenses";
import EntryCard from "../../components/entryCard";
import useToken from "../../hooks/useToken";
import { RootStackParamList, createType } from "../../navigation/Stack";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ExpenseCard from "../../components/expenseCard";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const { token } = useToken();
  const {
    entries,
    isLoading: isLoadingEntries,
    isError: isErrorEntries,
  } = useEntries({ token });
  const {
    expenses,
    isLoading: isLoadingExpenses,
    isError: isErrorExpenses,
  } = useExpenses({ token });

  return (
    <View style={styles.container}>
      <View></View>
      {isLoadingEntries ? (
        <Text>...Loading</Text>
      ) : isErrorEntries ? (
        <Text>Error</Text>
      ) : (
        <View style={styles.scrollSection}>
          <Text style={styles.title}>Entries</Text>
          <ScrollView horizontal scrollEnabled>
            {entries &&
              entries.map((entry) => {
                return (
                  <EntryCard
                    key={entry._id}
                    edit={() => {
                      navigation.navigate("Create", {
                        entry: entry,

                        type: createType.ENTRY,
                      });
                    }}
                    entry={entry}
                  />
                );
              })}
          </ScrollView>
        </View>
      )}
      {isLoadingExpenses ? (
        <Text>...Loading</Text>
      ) : isErrorExpenses ? (
        <Text>Error</Text>
      ) : (
        <View style={styles.scrollSection}>
          <Text style={styles.title}>Expenses</Text>
          <ScrollView horizontal scrollEnabled>
            {!expenses?.length ? (
              <Text>Not expenses</Text>
            ) : (
              expenses.map((expense) => {
                return (
                  <ExpenseCard
                    key={expense._id}
                    edit={() => {
                      navigation.navigate("Create", {
                        expense: expense,
                        type: createType.EXPENSE,
                      });
                    }}
                    expense={expense}
                  />
                );
              })
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollSection: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  title: {
    margin: 10,
    width: "100%",
  },
});
