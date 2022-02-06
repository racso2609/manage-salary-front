import { View, Text, ScrollView } from "../../components/styledComponents";
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
    <View style={styles.container} background="green">
      <Text style={styles.title}>Entries</Text>
      {isLoading && <Text>...Loading</Text>}
      {isError && <Text>Error</Text>}
      <ScrollView horizontal scrollEnabled style={styles.scrollSection}>
        {entries &&
          entries.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} />;
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center"
  },
  scrollSection: {
    padding: 10,
    height: "20%",
    width: "100%",
    alignItems: "center",
  },
  title: {
    margin: 10,
    width: "100%",
  },
});
