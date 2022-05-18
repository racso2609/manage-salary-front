import { useContext } from "react";
import { View, Text, TouchableOpacity } from "../styledComponents";
import { entryInterface } from "../../interfaces/entries";
import ThemeContext from "../../context/colorContext";

import { StyleSheet } from "react-native";

interface propsTypes {
  entry: entryInterface;
  edit: () => void;
}
export default function EntryCard(props: propsTypes) {
  const { entry, edit } = props;
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;

  const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: colors.border,
      paddingHorizontal: 20,
      paddingVertical: 15,
      width: 225,
      margin: 5,
      borderRadius: 20,
    },
    dot: {
      width: 10,
      height: 10,
    },
  });
  return (
    <View style={styles.card}>
      <Text numberOfLines={1}>{entry.name}</Text>
      <Text numberOfLines={1}>{entry.description}</Text>
      <Text numberOfLines={1}>{entry.amount}</Text>
      <View
        style={[
          styles.dot,
          { backgroundColor: entry.active ? "green" : "red" },
        ]}
      />
      <TouchableOpacity onPress={edit}>edit</TouchableOpacity>
    </View>
  );
}