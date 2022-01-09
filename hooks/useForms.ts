import { useState } from "react";

interface propsType {
  type: string;
  default?: string;
}

export default function UseForms(props: propsType) {
  const { type } = props;
  const [defaultValue, setDefaultValue] = useState<string>(props.default || "");
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
    type === "password"
  );

  const onChangeText = (text: string) => setDefaultValue(text);
  const toggleSecureText = () => setSecureTextEntry((prev) => !prev);
  return {
    defaultValue,
    onChangeText,
    type,
    secureTextEntry,
    toggleSecureText,
  };
}
