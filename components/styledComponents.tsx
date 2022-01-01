import { useContext } from "react";
import Themecontext from "../context/colorContext";
import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  TextInput as DefaultTextInput,
} from "react-native";
import { childrenProps } from "../types";

interface textInput {
  defaultValue: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  secureTextEntry?: boolean;
}

interface propsTypes extends childrenProps {
  style?: any;
  onPress?: () => void;
}

export function Text(props: propsTypes) {
  const { children, style } = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;
  return (
    <DefaultText style={[style, { color: colors.text }]}>
      {children}
    </DefaultText>
  );
}

export function View(props: propsTypes) {
  const { children, style } = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;
  return (
    <DefaultView style={[style, { backgroundColor: colors.background }]}>
      {children}
    </DefaultView>
  );
}

export function TouchableOpacity(props: propsTypes) {
  const { children, style, onPress } = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;
  return (
    <DefaultTouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          color: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text>{children}</Text>
    </DefaultTouchableOpacity>
  );
}

export function TextInput(props: textInput) {
  const { defaultValue, onChangeText } = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;

  return (
    <DefaultTextInput
      style={[
        props?.style,
        {
          backgroundColor: colors.card,
          paddingHorizontal: 10,
          height: 40,
          borderRadius: 10,
          marginVertical: 10,
        },
      ]}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      placeholder={props.placeholder || ""}
      secureTextEntry={props?.secureTextEntry}
    />
  );
}
