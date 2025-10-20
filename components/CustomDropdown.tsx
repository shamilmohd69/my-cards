import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";

interface Props {
    label: string;
    items: { label: string; value: string }[];
    selectedValue?: string;
    onValueChange: (value: string) => void;
    isSelectOpen: boolean;
    setIsSelectOpen: (value: boolean) => void;
}

const CustomDropdown: React.FC<Props> = ({ label, items, selectedValue, onValueChange, isSelectOpen, setIsSelectOpen }) => {

    const handleSelect = (value: string) => {
        onValueChange(value);
        setIsSelectOpen(false);
    };

    const selectedLabel = items.find(item => item.value === selectedValue)?.label;

    return (
        <View className="mb-4 relative z-10">
            {/* Label */}
            <Text className="text-white mb-2">{label}</Text>

            {/* Dropdown box */}
            <TouchableOpacity
                className="flex-row justify-between items-center p-3 border border-gray-700 rounded-md bg-[#1E1C1C]"
                onPress={() => setIsSelectOpen(!isSelectOpen)}
                activeOpacity={0.8}
            >
                <Text className="text-white">{selectedLabel || "Select an option"}</Text>
                <Ionicons name={isSelectOpen ? "chevron-up" : "chevron-down"} size={20} color="white" />
            </TouchableOpacity>

            {isSelectOpen && (
                <Pressable
                    className="absolute inset-0 z-20"
                    onPress={() => setIsSelectOpen(false)}
                >
                    <View className="absolute top-20 w-full bg-[#1E1C1C] border border-gray-700 rounded-md z-30">
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.value}
                            nestedScrollEnabled
                            showsVerticalScrollIndicator={true}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="px-3 py-3 border-b border-gray-800"
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text className="text-white">{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            )}
        </View>
    );
};

export default CustomDropdown;
