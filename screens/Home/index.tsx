import { View, Text, ScrollView } from "../../components/styledComponents";
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth";
import useEntry from "../../swr/useEntry";
import EntryCard from "../../components/entryCard";

export default function Home() {
  const { getToken } = useContext(AuthContext);
  const [token, setToken] = useState("");
  const { entries, isLoading, isError } = useEntry({ token });

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  return (
    <View>
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
  scrollSection: {
    padding: 10,
  },
  title: {
    margin: 10,
  },
});
