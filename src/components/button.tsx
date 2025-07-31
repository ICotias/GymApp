import { TouchableOpacity, Text } from "react-native";
import { ButtonSpinner } from "@gluestack-ui/themed";

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline";
  style?: any;
}

export function Button({
  title,
  variant = "default",
  onPress,
  isLoading,
  disabled,
  style,
}: ButtonProps) {
  const isDisabled = isLoading || disabled;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        {
          backgroundColor: variant === "outline" ? "transparent" : "#00875F",
          borderColor: variant === "outline" ? "#00875F" : "transparent",
          borderWidth: variant === "outline" ? 1 : 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 5,
          padding: 20,
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ButtonSpinner color={variant === "outline" ? "#00875F" : "white"} />
      ) : (
        <Text
          style={{
            color: variant === "outline" ? "#00875F" : "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
