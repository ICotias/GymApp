import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import HomeSVG from "@assets/home.svg";
import HistorySVG from "@assets/history.svg";
import ProfileSVG from "@assets/profile.svg";

import { Home } from "@screens/Costumer/Home";
import { History } from "@screens/Costumer/History";
import { Profile } from "@screens/Costumer/Profile";
import { Exercise } from "@screens/Costumer/Exercise";

import { Platform } from "react-native";

const { Navigator, Screen } = createBottomTabNavigator<CostumerRoutes>();

type CostumerRoutes = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
  Exercise: undefined;
};

const iconSize = 24;

export type CostumerNavigatorRoutesProps =
  BottomTabNavigationProp<CostumerRoutes>;

export function CostumerRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00B37E",
        tabBarInactiveTintColor: "#7C7C8A",
        tabBarStyle: {
          backgroundColor: "#202024",
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 86,
          paddingTop: 20,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="Exercise"
        component={Exercise}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
    </Navigator>
  );
}
