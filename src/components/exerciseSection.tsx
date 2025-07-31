import { View, Text, Image, SafeAreaView } from "react-native";
import GymWeight from "@assets/series.svg";
import Repetition from "@assets/repetitions.svg";
import { Button } from "@components/button";
import React, { useState, useEffect } from "react";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "./ToastMessage";
import { Loading } from "./loading";

interface ExerciseSectionProps {
  exerciseId?: string;
}

export const ExerciseSection = ({ exerciseId }: ExerciseSectionProps) => {
  const [exercise, setExercise] = useState<ExerciseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [canRegisterAgain, setCanRegisterAgain] = useState(true);

  async function fetchExerciseDetails() {
    if (!exerciseId) {
      setExercise(null);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.get(`exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error: unknown) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      ToastMessage({
        title: "Erro",
        type: "error",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    if (sendingRegister || !canRegisterAgain) {
      return;
    }

    try {
      setSendingRegister(true);
      setCanRegisterAgain(false);

      const response = await api.post("/history", { exercise_id: exerciseId });

      setIsRegistered(true);

      ToastMessage({
        title: "Parabéns! Exercício registrado no seu histórico",
        type: "success",
        message: "Você pode ver o histórico de exercícios no seu perfil.",
      });

      setTimeout(() => {
        setCanRegisterAgain(true);
        setIsRegistered(false);
        ToastMessage({
          title: "Exercício disponível novamente",
          type: "success",
          message: "Você pode registrar o exercício novamente.",
        });
      }, 86400);
    } catch (error: unknown) {
      const isAppError = error instanceof AppError;
      let message = "Não foi possível registrar o exercício.";

      if (isAppError) {
        if (
          error.message.includes("token.invalid") ||
          error.message.includes("token")
        ) {
          message = "Sessão expirada. Faça login novamente.";
        } else {
          message = error.message;
        }
      }

      ToastMessage({
        title: "Erro ao registrar exercício",
        type: "error",
        message,
      });

      setCanRegisterAgain(true);
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
    setSendingRegister(false);
    setIsRegistered(false);
    setCanRegisterAgain(true);
  }, [exerciseId]);

  if (!exercise || isLoading) {
    return (
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121214",
          flex: 1,
        }}
      >
        <Text style={{ color: "#E1E1E6", fontSize: 16 }}>
          {exerciseId
            ? "Carregando exercício..."
            : "Nenhum exercício selecionado"}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#121214",
            flex: 1,
          }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <Image
              source={{
                uri: `${api.defaults.baseURL}exercise/demo/${exercise.demo}`,
              }}
              style={{
                width: 350,
                height: 350,
                marginTop: 20,
                borderRadius: 10,
              }}
              onError={(error) =>
                console.log("Erro ao carregar imagem:", error.nativeEvent.error)
              }
              resizeMode="contain"
            />
          )}

          <View
            style={{
              backgroundColor: "#202024",
              paddingHorizontal: 20,
              paddingBottom: 10,
              borderRadius: 10,
              marginTop: 20,
              gap: 10,
            }}
          >
            <Text
              style={{
                color: "#E1E1E6",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              {exercise.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 40,
                paddingTop: 20,
                gap: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <GymWeight />
                <Text style={{ fontSize: 16, color: "#E1E1E6" }}>
                  {exercise.series} séries
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Repetition />
                <Text style={{ fontSize: 16, color: "#E1E1E6" }}>
                  {exercise.repetitions} repetições
                </Text>
              </View>
            </View>

            <Button
              onPress={handleExerciseHistoryRegister}
              title={
                isRegistered
                  ? "Exercício registrado ✓"
                  : "Marcar como realizado"
              }
              isLoading={sendingRegister}
              disabled={sendingRegister || isRegistered || !canRegisterAgain}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
