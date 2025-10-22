// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ navigation }) => ({
                tabBarStyle: {
                    display: "none"
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
            <Tabs.Screen name="addNewCard"
                options={{
                    title: "Add Card",
                }} />


        </Tabs>
    );
}
