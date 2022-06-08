import { MutableRefObject, useContext, useEffect, useRef } from "react";
import ThemeContext from "../context/colorContext";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  Button as DefaultButton,
  ScrollView as DefaultScrollView,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
  TouchableOpacity as DefaultTouchableOpacity,
} from "react-native";

import { childrenProps } from "../types";

interface textInput {
  defaultValue: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  secureTextEntry?: boolean;
  background?: string;
  multiline?: boolean;
  numberOfLines?: number;
  height?: number | string;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: (a: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (a: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  disabled?: boolean;
}

interface propsTypes extends childrenProps {
  style?: any;
  onPress?: () => void;
  background?: string;
  styleText?: any;
}
interface touchableType extends propsTypes {
  isContainer?: boolean;
}

interface buttonTypes extends propsTypes {
  color?: string;
  onPress: () => void;
  title: string;
}

interface textTypes extends propsTypes {
  numberOfLines?: number;
  ellipsizeMode?: string;
  color?: string;
}

export const Text: React.FC<textTypes> = (props) => {
  const { children, style, numberOfLines, color } = props;
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;
  const possibleColor = Object.keys(colors);
  const textColor =
    color && possibleColor.includes(color)
      ? //@ts-ignore
        colors[color]
      : color
      ? color
      : colors.text;
  return (
    <DefaultText
      numberOfLines={numberOfLines || 0}
      style={[{ color: textColor }, style]}
    >
      {children}
    </DefaultText>
  );
};

export function View(props: propsTypes) {
  const { children, style } = props;
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;
  return (
    <DefaultView
      style={[
        { backgroundColor: props?.background || colors.background },
        style,
      ]}
    >
      {children}
    </DefaultView>
  );
}

export function TouchableOpacity(props: touchableType) {
  const { children, style, onPress, styleText, isContainer } = props;
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;
  return (
    <DefaultTouchableOpacity
      onPress={onPress}
      style={[
        {
          color: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {!isContainer ? <Text {...styleText}>{children}</Text> : children}
    </DefaultTouchableOpacity>
  );
}

export function TextInput(props: textInput) {
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;
  const {
    style,
    defaultValue,
    onChangeText,
    placeholder,
    secureTextEntry,
    background,
    multiline,
    numberOfLines,
    height,
    keyboardType,
    onFocus,
    onBlur,
    disabled,
  } = props;

  return (
    <DefaultTextInput
      placeholder={placeholder || ""}
      secureTextEntry={secureTextEntry}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={!disabled}
      style={[
        {
          backgroundColor: background || colors?.card,
          paddingHorizontal: 10,
          height: height || 40,
          borderRadius: 10,
          marginVertical: 10,
          flexGrow: 1,
        },
        style,
      ]}
    />
  );
}
export function Button(props: buttonTypes) {
  const { color, onPress, title, style } = props;
  const { theme } = useContext(ThemeContext);
  const { colors } = theme;

  return (
    <View style={style}>
      <DefaultButton
        onPress={onPress}
        title={title}
        color={color || colors.primary}
      />
    </View>
  );
}

interface scrollView extends propsTypes {
  horizontal?: boolean;
  scrollEnabled?: boolean;
}
export function ScrollView(props: scrollView) {
  const { style, children, horizontal, scrollEnabled } = props;
  // const { theme } = useContext(ThemeContext);
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
