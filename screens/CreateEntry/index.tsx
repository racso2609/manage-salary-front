import {
  View,
  Text,
  Button,
  TextInput,
} from "../../components/styledComponents";
import { StyleSheet } from "react-native";
import UseForms from "../../hooks/useForms";

export default function () {
  const amount = UseForms({ type: "text" });
  const description = UseForms({ type: "text" });
  const name = UseForms({ type: "text" });
  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput {...name} />
        <Text>Amount</Text>
        <TextInput {...amount} />
        <Text>Description</Text>
        <TextInput {...description} />
      </View>
      <Button style={styles.sendButton} onPress={() => {}} title="create" />
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
