import Leave from "@assets/leave.svg";
import { View, Text, TouchableOpacity } from "react-native";
import { UserPhoto } from "@components/userPhoto";
import BackButton from "@assets/back-button.svg";
import BodyIcon from "@assets/body.svg";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";

type HeaderProps = {
  title?: string;
  variant?: "default" | "home" | "exercise";
};

export function Header({ title, variant = "home" }: HeaderProps) {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  if (variant === "home") {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 24,
          paddingTop: 60,
          backgroundColor: "#202024",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            paddingBottom: 30,
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <UserPhoto source={{ uri: user.avatar }} />

          <View>
            <Text style={{ fontSize: 16, color: "white" }}>Olá, </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {user.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ paddingVertical: 25 }}
          onPress={() => {
            signOut();
          }}
        >
          <Leave width={35} height={35} />
        </TouchableOpacity>
      </View>
    );
  }

  if (variant === "exercise") {
    return (
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 30,
          backgroundColor: "#202024",
          gap: 15,
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackButton width={30} height={30} />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            Puxada frontal
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <BodyIcon width={25} height={25} />
            <Text style={{ color: "white", fontSize: 20, fontWeight: "400" }}>
              Costas
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 24,
        paddingVertical: 30,
        backgroundColor: "#202024",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
          marginTop: 40,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
