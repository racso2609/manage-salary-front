import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import UseForms from "../../hooks/useForms";
import { childrenProps } from "../../types";
import { TextInput } from "../styledComponents";
interface propsTypes extends childrenProps {
  defaultValue: string;
  onChangeText: (a: string) => void;
  show: boolean;
}
const SelectInput: FC<propsTypes> = ({ children, show }) => {
  const internalValue = UseForms({ default: "", type: "text" });
  const [isFocus, setFocus] = useState(false);
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const showPanel = isFocus && show;
  console.log(showPanel);

  return (
    <View style={[styles.container]}>
      <TextInput onFocus={onFocus} onBlur={onBlur} {...internalValue} />
      {showPanel && <View style={[styles.list]}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  list: {
    position: "absolute",
    top: "90%",
    backgroundColor: "blue",
    minHeight: 5,
    minWidth: "100%",
  },
});

export default SelectInput;
