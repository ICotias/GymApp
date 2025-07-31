import { TextInput, View, Text } from "react-native";
import { useState, forwardRef } from "react";
import React from "react";

interface InputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  variant?: "onBoarding" | "onEditing" | "onDisabled";
  editable?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  isErrored?: boolean;
  errorMessage?: string;
  returnKeyType?: "next" | "done";
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      placeholder,
      secureTextEntry,
      onSubmitEditing,
      keyboardType,
      autoCapitalize,
      variant = "onBoarding",
      editable = variant === "onDisabled" ? false : true,
      onChangeText,
      value,
      isErrored = false,
      errorMessage,
      returnKeyType,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <>
        <View
          style={{
            backgroundColor:
              variant === "onBoarding"
                ? "#121214"
                : isFocused
                  ? "#202024"
                  : variant === "onDisabled"
                    ? "#20202450"
                    : "#242427",

            borderRadius: 5,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderWidth: isErrored
              ? 1
              : variant === "onBoarding" && isFocused
                ? 1
                : 0,
            borderColor: isErrored
              ? "#FF0000"
              : variant === "onBoarding" && isFocused
                ? "#00875F"
                : "#121214",
          }}
        >
          <TextInput
            ref={ref}
            style={{ color: "white", fontSize: 14, fontWeight: "500" }}
            placeholder={placeholder}
            placeholderTextColor="#7C7C8A"
            secureTextEntry={secureTextEntry}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={editable}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
        {isErrored && (
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </Text>
        )}
      </>
    );
  }
);
