import { View } from "react-native";
import { AuthRoutes } from "./auth.routes";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { CostumerRoutes } from "./costumer.routes";
import { Loading } from "@components/loading";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {user.id ? <CostumerRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
