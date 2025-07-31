import Toast, { BaseToast } from "react-native-toast-message";

interface ToastMessageProps {
  type: "success" | "error";
  title: string;
  message: string;
}

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 8,
        height: "auto",
        borderLeftColor: "#00b34b",
        marginTop: 16,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),

  error: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        paddingVertical: 8,
        height: "auto",
        borderLeftColor: "#ff2335",
        marginTop: 16,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

export function ToastMessage({ type, title, message }: ToastMessageProps) {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    position: "top",
    swipeable: true,
    visibilityTime: 4000,
  });
}
