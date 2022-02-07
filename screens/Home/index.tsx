import {
  View,
  Text,
  ScrollView,
  Button,
} from "../../components/styledComponents";
import { StyleSheet } from "react-native";
// import { useContext } from "react";
// import AuthContext from "../../context/auth";
import useEntries from "../../swr/useEntries";
import EntryCard from "../../components/entryCard";
import useToken from "../../hooks/useToken";
import { RootStackParamList } from "../../navigation/Stack";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  // const { getToken } = useContext(AuthContext);
  const { token } = useToken();
  const { entries, isLoading, isError } = useEntries({ token });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>...Loading</Text>
      ) : isError ? (
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
                      navigation.navigate("Create", { entry: entry});
                    }}
                    entry={entry}
                  />
                );
              })}
          </ScrollView>
        </View>
      )}
      <Button
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("Create", {});
        }}
        title="hola"
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
