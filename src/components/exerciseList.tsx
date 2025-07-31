import { View, Text } from "react-native";
import { ExerciseCard } from "./exerciseCard";
import { useState, useEffect } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "./ToastMessage";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

export function ExerciseList({
  onPress,
  group,
}: {
  onPress: (id: string) => void;
  group: string;
}) {
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchExercisesByGroup(group: string) {
    setLoading(true);
    try {
      if (!group) {
        setExercises([]);
        setLoading(false);
        return;
      }
      const response = await api.get(`exercises/bygroup/${group}`);
      setExercises(response.data);
    } catch (error: unknown) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : "Could not load exercises.";

      ToastMessage({
        title: "Error",
        type: "error",
        message: message,
      });
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExercisesByGroup(group);
  }, [group]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121214",
        paddingHorizontal: 24,
        paddingTop: 40,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#C4C4CC", fontSize: 16, fontWeight: "700" }}>
          Exercícios
        </Text>
        <Text style={{ color: "#C4C4CC", fontSize: 16, fontWeight: "400" }}>
          {exercises.length}
        </Text>
      </View>
      {loading ? (
        <Text style={{ color: "#C4C4CC", marginTop: 20 }}>Loading...</Text>
      ) : exercises.length === 0 ? (
        <Text style={{ color: "#C4C4CC", marginTop: 20 }}>
          Nenhum exercício encontrado para este grupo.
        </Text>
      ) : (
        exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onPress={() => onPress(exercise.id)}
          />
        ))
      )}
    </View>
  );
}
