import { useContext, FC } from "react";
import { StyleSheet } from "react-native";
import ThemeContext from "../../context/colorContext";
import { categoryInterface } from "../../interfaces/categories";
import { Text, View } from "../styledComponents";
interface propsType {
  category: categoryInterface;
  color?: string;
  fontSize?: any;
  active?: boolean;
}
const CategoryTag: FC<propsType> = ({ category, color, fontSize, active }) => {
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;

  const styles = StyleSheet.create({
    tagContainer: {
      backgroundColor: active ? colors.active : colors.card,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    textContainer: {
      fontSize: fontSize | 12,
      fontWeight: "bold",
    },
  });
  return (
    <View style={[styles.tagContainer]}>
      <Text style={[styles.textContainer, { color: color || colors.text }]}>
        {category.name}
      </Text>
    </View>
  );
};

export default CategoryTag;
