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
  background?: string;
  multiline?: boolean;
  numberOfLines?: number;
  height?: number | string;
  keyboardType?: string;
}

interface propsTypes extends childrenProps {
  style?: any;
  onPress?: () => void;
  background?: string;
  styleText?: any;
}

interface buttonTypes extends propsTypes {
  color?: string;
  onPress: () => void;
  title: string;
}

interface textTypes extends propsTypes {
  numberOfLines?: number;
  ellipsizeMode?: string;
}

export function Text(props: textTypes) {
  const { children, style, numberOfLines } = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;
  return (
    <DefaultText
      numberOfLines={numberOfLines || 0}
      style={[style, { color: colors.text }]}
    >
      {children}
    </DefaultText>
  );
}

export function View(props: propsTypes) {
  const { children, style } = props;
  const { theme } = useContext(Themecontext);
  const { colors } = theme;
  return (
    <DefaultView
      style={[
        style,
        { backgroundColor: props?.background || colors.background },
      ]}
    >
      {children}
    </DefaultView>
  );
}

export function TouchableOpacity(props: propsTypes) {
  const { children, style, onPress, styleText } = props;
  const { theme } = useContext(Themecontext);
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
      <Text>{children}</Text>
    </DefaultTouchableOpacity>
  );
}

export function TextInput(props: textInput) {
  const { theme } = useContext(Themecontext);
  const { colors } = theme;
  const { style } = props;

  return (
    <DefaultTextInput
      placeholder={props.placeholder || ""}
      secureTextEntry={props?.secureTextEntry}
      {...props}
      style={[
        {
          backgroundColor: props?.background || colors?.card,
          paddingHorizontal: 10,
          height: props?.height || 40,
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
  const { theme } = useContext(Themecontext);
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
