import { useContext } from "react";
import Themecontext from "../context/colorContext";
import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultTouchableOpacity,
  TextInput as DefaultTextInput,
  Button as DefaultButton,
  ScrollView as DefaultScrollView,
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

interface buttonTypes {
  color?: string;
  onPress: () => void;
  title: string;
}

interface textTypes extends propsTypes {
  numberOfLines?: number;
  ellipsizeMode?: string;
}

export function Text(props: textTypes) {
  const { children, style, numberOfLines} = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;
  return (
    <DefaultText
      numberOfLines={numberOfLines||0}
      style={[style, { color: colors.text }]}
    >
      {children}
    </DefaultText>
  );
}

export function View(props: propsTypes) {
  const { children, style } = props;
  // const { theme } = useContext(Themecontext);
  // const { colors } = theme;
  return <DefaultView style={[style]}>{children}</DefaultView>;
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
export function Button(props: buttonTypes) {
  const { color, onPress, title } = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;

  return (
    <DefaultButton
      onPress={onPress}
      title={title}
      color={color || colors.primary}
    />
  );
}

interface scrollView extends propsTypes {
  horizontal?: boolean;
  scrollEnabled?: boolean;
}
export function ScrollView(props: scrollView) {
  const { style, children, horizontal, scrollEnabled } = props;
  // const { theme } = useContext(Themecontext);
  // const { colors } = theme;

  return (
    <DefaultScrollView
      horizontal={horizontal}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={style}
    >
      {children}
    </DefaultScrollView>
  );
}
