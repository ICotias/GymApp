import { Header } from "@components/header";
import { SafeAreaView, Text, View, SectionList } from "react-native";
import React, { useState } from "react";
import { ExerciseHistoryCard } from "@components/exerciseHistoryCard";
import { ToastMessage } from "@components/ToastMessage";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { HistoryDTO } from "@dtos/ExerciseHistoryDTO";
import { useFocusEffect } from "@react-navigation/native";

interface ExerciseSection {
  title: string;
  data: HistoryDTO[];
}

export function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<ExerciseSection[]>([]);

  async function fetchHistory() {
    setIsLoading(true);
    try {
      const response = await api.get(`history`);
      console.log("Dados do histórico:", response.data);
      setExercises(response.data);
    } catch (error: unknown) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios.";

      ToastMessage({
        title: "Erro",
        type: "error",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Usa useFocusEffect para atualizar sempre que a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <>
      <Header title="Histórico de Exercícios" variant="default" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#121214",
        }}
      >
        <SectionList
          sections={exercises}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, section }) => (
            <>
              <View style={{ paddingTop: 32, paddingHorizontal: 24 }}>
                <Text
                  style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}
                >
                  {section.title}
                </Text>
              </View>
              <ExerciseHistoryCard data={item} />
            </>
          )}
          contentContainerStyle={
            exercises.length === 0 && {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }
          }
          ListEmptyComponent={() => (
            <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
              Nenhum exercício registrado ainda.{"\n"}
              Vamos treinar hoje?
            </Text>
          )}
        />
      </SafeAreaView>
    </>
  );
}
