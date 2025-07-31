import { Spinner } from "@gluestack-ui/themed";
import { View } from "react-native";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner color="white" />
    </View>
  );
}
