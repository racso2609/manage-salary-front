import {
  View,
  Text,
  Button,
  TextInput,
} from "../../components/styledComponents";
import { StyleSheet } from "react-native";
import UseForms from "../../hooks/useForms";
import useToken from "../../hooks/useToken";
import { createEntry, updateEntries } from "../../requests/entries";
import { RootStackParamList } from "../../navigation/Stack";
// import useEntry from "../../swr/useEntry";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Create">;

export default function ({ route }: Props) {
  const { params } = route;
  const { entry } = params;
  const { token } = useToken();

  const amount = UseForms({ type: "text", default: entry?.amount?.toString() });
  const description = UseForms({ type: "text", default: entry?.description });
  const name = UseForms({ type: "text", default: entry?.name });

  const onSubmit = async () => {
    const data = {
      amount: amount.defaultValue,
      description: description.defaultValue,
      name: name.defaultValue,
    };
    if (!entry?._id) await createEntry({ data, token, entryId: "" });
    else await updateEntries({ data, token, entryId: entry._id });
  };
  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput {...name} />
        <Text>Amount</Text>
        <TextInput keyboardType="numeric" {...amount} />
        <Text>Description</Text>
        <TextInput height={70} multiline {...description} />
      </View>
      <Button style={styles.sendButton} onPress={onSubmit} title="create" />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    marginTop: 20,
  },
  sendButton: {
    width: "90%",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});
