// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ navigation }) => ({
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#888",
                tabBarStyle: {
                    backgroundColor: "#000",
                    height: 100,
                    paddingTop: 10,
                    borderWidth: 0,
                    borderTopColor: "#222"
                },
                tabBarLabelStyle: {
                    fontFamily: "Doto-Medium",
                    fontSize: 12,
                },
                headerShown: true,
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTitleStyle: {
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontFamily: "Doto-Bold",

                },
                headerBackButtonDisplayMode: "minimal",
                headerTintColor: "#FFFFFF",
                headerStyle: {
                    backgroundColor: "#000",
                    borderBottomColor: "#222",
                    borderBottomWidth: 0.5,
                },

                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="flex flex-row items-center"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                        <Text className="font-bold ml-1 text-white" >Back</Text>
                    </TouchableOpacity>
                ),
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={22}
                            color={color}
                        />
                    ),
                    headerLeft: () => null,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "search" : "search-outline"}
                            size={22}
                            color={color}
                        />
                    ),
                    headerLeft: () => null,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "settings" : "settings-outline"} size={22} color={color} />
                    ),
                    headerLeft: () => null,
                }}
            />
        </Tabs>
    );
}
