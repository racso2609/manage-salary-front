import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import EntryCard from "../../components/entryCard";
import { ScrollView, Text, View } from "../../components/styledComponents";
import useToken from "../../hooks/useToken";
import { createType, RootStackParamList } from "../../navigation/Stack";
import UseEntries from "../../swr/useEntries";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const Entries: FC<Props> = ({ navigation }) => {
  const { token } = useToken();
  const { entries, isLoading, isError } = UseEntries({ token });

  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>Expense Summary</Text>
      <ScrollView
        scrollEnabled
        style={[{ justifyContent: "center", alignItems: "center" }]}
      >
        {isLoading && <Text>...Loading</Text>}
        {isError && <Text>...Error</Text>}
        {entries?.map((entry) => {
          return (
            <EntryCard
              entry={entry}
              key={entry._id}
              edit={() => {
                navigation.navigate("Create", {
                  entry,
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
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Entries;
