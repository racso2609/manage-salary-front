import { useContext } from "react";
import { View, Text, TouchableOpacity } from "../styledComponents";
import { entryInterface } from "../../interfaces/entries";
import ThemeContext from "../../context/colorContext";

import { StyleSheet } from "react-native";

interface propsTypes {
  entry: entryInterface;
  edit: () => void;
  width?: string | number;
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
    cardOption: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={[styles.card, { width: props.width }]}>
      <Text numberOfLines={1}>{entry.name}</Text>
      <Text numberOfLines={1}>{entry.description}</Text>
      <Text numberOfLines={1}>{entry.amount}</Text>
      <View
        style={[
          styles.dot,
          { backgroundColor: entry.active ? "green" : "red" },
        ]}
      />
      <View style={[styles.cardOption]}>
        <TouchableOpacity styleText={{ color: "blue" }} onPress={edit}>
          edit
        </TouchableOpacity>

        <TouchableOpacity styleText={{ color: "red" }} onPress={edit}>
          delete
        </TouchableOpacity>
      </View>
    </View>
  );
}
