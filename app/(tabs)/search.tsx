import { Text, View } from "react-native";

export default function Search() {
    return (
        <View
            className="bg-black"
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text className="text-white">Search Screen</Text>
        </View>
    )
}