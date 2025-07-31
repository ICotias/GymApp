import { View, Image, ImageSourcePropType } from "react-native";
import UserIcon from "@assets/profile.svg";
import { useAuth } from "@hooks/useAuth";

type UserPhotoProps = {
  width?: number;
  height?: number;
  source?: ImageSourcePropType;
};

export function UserPhoto({ width = 80, height = 80, source }: UserPhotoProps) {
  const { user } = useAuth();

  return user.avatar ? (
    <View>
      <Image
        source={source}
        style={{
          width,
          height,
          borderRadius: 100,
          borderWidth: 3,
          borderColor: "#323238",
        }}
      />
    </View>
  ) : (
    <View>
      <UserIcon width={90} height={90} fill="#656569" />
    </View>
  );
}
