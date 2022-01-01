import { Text as DefaultText, View as DefaultView } from "react-native";
// import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { childrenProps } from "../types";

interface propsTypes extends childrenProps {
  style?: any;
}

export function Text(props: propsTypes) {
  const { children, style } = props;
  const { colors } = useTheme();
  return (
    <DefaultText style={{ ...style, color: colors.text }}>
      {children}
    </DefaultText>
  );
}

export function View(props: propsTypes) {
  const { children, style } = props;
  // const { colors } = useTheme();
  return <DefaultView style={{ ...style }}>{children}</DefaultView>;
}
