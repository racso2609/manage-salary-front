import {
  View,
  Text,
  ScrollView,
  Button,
} from "../../components/styledComponents";
import { StyleSheet } from "react-native";
import useEntries from "../../swr/useEntries";
import useExpenses from "../../swr/useExpenses";
import EntryCard from "../../components/entryCard";
import useToken from "../../hooks/useToken";
import { RootStackParamList, createType } from "../../navigation/Stack";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
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
                      navigation.navigate("Create", { entry: entry });
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
            {!expenses.lenght ? (
              <Text>Not expenses</Text>
            ) : (
              expenses.map((entry) => {
                return (
                  <EntryCard
                    key={entry._id}
                    edit={() => {
                      navigation.navigate("Create", {
                        expense: expense,
                      });
                    }}
                    entry={entry}
                  />
                );
              })
            )}
          </ScrollView>
        </View>
      )}
      <Button
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("Create", { type: createType.ENTRY });
        }}
        title="create entry"
      />

      <Button
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("Create", { type: createType.EXPENSE });
        }}
        title="create expenses"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
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
  buttonStyle: {
    width: "90%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
