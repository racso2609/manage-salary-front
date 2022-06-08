import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import EntryCard from "../../components/entryCard";
import {
  ScrollView,
  Text,
  View,
  Button,
} from "../../components/styledComponents";
import useToken from "../../hooks/useToken";
import { createType, RootStackParamList } from "../../navigation/Stack";
import UseEntries from "../../swr/useEntries";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const Entries: FC<Props> = ({ navigation }) => {
  const { token } = useToken();
  const { entries, isLoading, isError } = UseEntries({ token });

  return (
    <View style={[styles.container]}>
      <ScrollView
        scrollEnabled
        style={[
          { justifyContent: "center", alignItems: "center", width: "100%" },
        ]}
      >
        {isLoading && <Text>...Loading</Text>}
        {isError && <Text>...Error</Text>}
        {entries?.map((entry) => {
          return (
            <View key={entry._id} style={[styles.cardItem]}>
              <EntryCard
                entry={entry}
                width="100%"
                edit={() => {
                  navigation.navigate("Create", {
                    entry,
                    type: createType.EXPENSE,
                  });
                }}
              />
            </View>
          );
        })}
      </ScrollView>
      <Button
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("Create", { type: createType.ENTRY });
        }}
        title="create entry"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    // justifyContent: "center",
    // alignItems: "center",
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
    width: "100%",
  },
});

export default Entries;
