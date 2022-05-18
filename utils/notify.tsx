import Toast from "react-native-toast-message";
interface notifyInterface {
  type: string;
  message?: string;
  title: string;
}

const send = (notification: notifyInterface) => {
  Toast.show({
    type: notification.type,
    text1: notification.title,
    text2: notification.message || "",
  });
};
const notify = { send };

export default notify;
