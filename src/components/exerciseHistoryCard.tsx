import { HistoryDTO } from "@dtos/ExerciseHistoryDTO";
import { View, Text, TouchableOpacity } from "react-native";

interface ExerciseHistoryCardProps {
  muscle: string;
  exerciseName: string;
  time: string;
  onPress: () => void;
}

type Props = {
  data: HistoryDTO;
};

export function ExerciseHistoryCard({ data }: Props) {
  return (
    <View style={{ paddingHorizontal: 24, flex: 1 }}>
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#202024",
          borderRadius: 10,
          padding: 16,
          marginTop: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "column", gap: 10, flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
          >
            {data.group}
          </Text>
          <Text numberOfLines={1} style={{ color: "#e1e1e6", fontSize: 16 }}>
            {data.name}
          </Text>
        </View>
        <Text style={{ color: "#e1e1e6", fontSize: 16 }}>{data.hour}</Text>
      </TouchableOpacity>
    </View>
  );
}
