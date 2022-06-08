import Toast from "react-native-root-toast";

interface notifyInterface {
  type: string;
  message?: string;
  title: string;
}

const send = (notification: notifyInterface) => {
  const message = notification.message ? notification.message : "";
  console.log(message);
  Toast.show(notification.title, {
    duration: Toast.durations.SHORT,
    backgroundColor: notification.type === "success" ? "lightgreen" : "red",
    textColor: notification.type === "success" ? "black" : "light",
  });
};
const notify = { send };

export default notify;
