import { Text, TouchableOpacity } from "react-native";

interface CarrouselType {
  item: string;
  isActive: boolean;
  onPress: () => void;
}

export function Carousel({ item, isActive, onPress }: CarrouselType) {
  return (
    <TouchableOpacity
      key={item}
      onPress={onPress}
      style={{
        width: 96,
        height: 43,
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#202024",
        borderColor: isActive ? "#00875F" : "#202024",
      }}
    >
      <Text
        style={{
          color: isActive ? "#00875F" : "#C4C4CC",
          fontSize: 12,
          fontWeight: "500",
          textTransform: "uppercase",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
}
