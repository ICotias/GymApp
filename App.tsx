import React from "react";
import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import { Loading } from "@components/loading";
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContext";
import { ExerciseProvider } from "@contexts/ExerciseContext";
import Toast from "react-native-toast-message";
import { toastConfig } from "@components/ToastMessage";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <ExerciseProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </ExerciseProvider>
      </AuthContextProvider>
      <Toast config={toastConfig} />
    </>
  );
}
