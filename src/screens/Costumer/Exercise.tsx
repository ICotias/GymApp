import { SafeAreaView } from "react-native";
import { Header } from "@components/header";
import React from "react";
import { ExerciseSection } from "@components/exerciseSection";
import { useExercise } from "@contexts/ExerciseContext";

export function Exercise() {
  const { selectedExerciseId } = useExercise();

  return (
    <>
      <Header variant="exercise" />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#121214", paddingHorizontal: 24 }}
      >
        <ExerciseSection exerciseId={selectedExerciseId || undefined} />
      </SafeAreaView>
    </>
  );
}
