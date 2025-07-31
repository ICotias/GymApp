import { TouchableOpacity, Image, Text, View } from "react-native";
import VectorRight from "@assets/right-vector.svg";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { truncateText } from "@utils/stringUtils";

type ExerciseCardProps = {
  exercise: ExerciseDTO;
  onPress: () => void;
};

export function ExerciseCard({ exercise, onPress }: ExerciseCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#29292E",
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 5,
        }}
        source={{
          uri: `${api.defaults.baseURL}exercise/thumb/${exercise.thumb}`,
        }}
        onError={(error) =>
          console.log("Erro ao carregar imagem:", error.nativeEvent.error)
        }
      />
      <View style={{ gap: 10, flex: 1 }}>
        <Text
          style={{ color: "#C4C4CC", fontSize: 18, fontWeight: "700" }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {truncateText(exercise.name, 20)}
        </Text>
        <Text style={{ color: "#C4C4CC", fontSize: 14, fontWeight: "300" }}>
          {exercise.series} séries x {exercise.repetitions} repetições
        </Text>
      </View>
      <VectorRight style={{ marginLeft: "auto" }} />
    </TouchableOpacity>
  );
}
