import { useContext } from "react";
import { View, Text } from "../styledComponents";
import { entryInterface } from "../../interfaces/entries";
import ThemeContext from "../../context/colorContext";

import { StyleSheet } from "react-native";

interface propsTypes {
  entry: entryInterface;
}
export default function EntryCard(props: propsTypes) {
  const { entry } = props;
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      color: colors.text,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: colors.border,
      paddingHorizontal: 20,
      paddingVertical: 15,
      width: 225,
      margin: 5,
      borderRadius: 20
    },
    dot: {
      width: 10,
      height: 10,
    },
  });
  return (
    <View style={styles.card}>
      <Text numberOfLines={1} >{entry.description}</Text>
      <Text numberOfLines={1}>{entry.amount}</Text>
      <View
        style={[
          styles.dot,
          { backgroundColor: entry.active ? "green" : "red" },
        ]}
      />
    </View>
  );
}
