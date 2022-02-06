import {
  View,
  Text,
  ScrollView,
  Button,
} from "../../components/styledComponents";
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth";
import useEntries from "../../swr/useEntries";
import EntryCard from "../../components/entryCard";

export default function Home() {
  const { getToken } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const { entries, isLoading, isError } = useEntries({ token });

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

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
                return <EntryCard key={entry._id} entry={entry} />;
              })}
          </ScrollView>
        </View>
      )}
      <Button style={styles.buttonStyle} onPress={() => {}} title="hola" />
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
