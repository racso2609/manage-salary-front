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
import { createExpense, updateExpenses } from "../../requests/expense";
import { RootStackParamList, createType } from "../../navigation/Stack";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Create">;

export default function ({ route }: Props) {
  const { params } = route;
  const { entry, expense, type } = params;
  const { token } = useToken();

  const editableObject = entry || expense;

  const amount = UseForms({
    type: "text",
    default: editableObject?.amount?.toString(),
  });
  const description = UseForms({
    type: "text",
    default: editableObject?.description,
  });
  const name = UseForms({ type: "text", default: editableObject?.name });

  const create = type === createType.ENTRY ? createEntry : createExpense;
  const update = type === createType.ENTRY ? updateEntries : updateExpenses;

  const onSubmit = async () => {
    const data = {
      amount: amount.defaultValue,
      description: description.defaultValue,
      name: name.defaultValue,
    };
    if (!editableObject?._id) await create({ data, token, entryId: "" });
    else await update({ data, token, editableObjectId: entry._id });
  };
  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        {type === createType.ENTRY && (
          <>
            <Text>Name</Text>
            <TextInput {...name} />
          </>
        )}

        <Text>Amount</Text>
        <TextInput keyboardType="numeric" {...amount} />
        <Text>Description</Text>
        <TextInput height={70} multiline {...description} />
        {type === createType.EXPENSE && (
          <>
            <Text>Category</Text>
            <TextInput {...name} />
          </>
        )}
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
