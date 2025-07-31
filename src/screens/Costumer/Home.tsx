import React, { useEffect, useState } from "react";
import { Header } from "@components/header";
import { Carousel } from "@components/carousel";
import { SafeAreaView, View, ScrollView } from "react-native";
import { ExerciseList } from "@components/exerciseList";
import { useNavigation } from "@react-navigation/native";
import { CostumerNavigatorRoutesProps } from "@routes/costumer.routes";
import { api } from "@services/api";
import { ToastMessage } from "@components/ToastMessage";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/loading";
import { useExercise } from "@contexts/ExerciseContext";

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const navigation = useNavigation<CostumerNavigatorRoutesProps>();
  const { setSelectedExerciseId } = useExercise();

  async function fetchGroups() {
    const response = await api.get("groups");
    setGroups(response.data);

    if (response.data.length > 0) {
      const exercisesResponse = await api.get(
        `exercises/bygroup/${response.data[0]}`
      );
      setExercises(exercisesResponse.data);
    }
  }

  async function fetchExercisesByGroup(group: string) {
    setIsLoading(true);
    try {
      const response = await api.get(`exercises/bygroup/${group}`);
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

  function handleOpenExerciseDetails(id: string) {
    setSelectedExerciseId(id);
    navigation.navigate("Exercise");
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <>
      <Header variant="home" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#121214" }}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 0,
              paddingTop: 40,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            {groups.map((group, index) => (
              <Carousel
                key={`${group}-${index}`}
                item={group}
                isActive={activeItem === group}
                onPress={() => {
                  setActiveItem(group);
                  fetchExercisesByGroup(group);
                }}
              />
            ))}
          </ScrollView>
        </View>
        {isLoading ? (
          <Loading />
        ) : (
          <ScrollView>
            <ExerciseList
              group={activeItem}
              onPress={handleOpenExerciseDetails}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}
