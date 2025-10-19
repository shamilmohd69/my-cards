import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface TopFilterTabsProps {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TopFilterTabs: React.FC<TopFilterTabsProps> = ({ tabs, activeTab, setActiveTab }) => {


    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 px-2  h-12"
            contentContainerStyle={{ alignItems: "flex-start", paddingRight: 24 }}
        >
            <View className="flex-row gap-3">
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        activeOpacity={0.7}
                        onPress={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full border ${activeTab === tab
                            ? "bg-red-600 border-red-600"
                            : "bg-black border-gray-700"
                            }`}
                    >
                        <Text
                            className={`text-sm font-medium ${activeTab === tab ? "text-white" : "text-gray-400"
                                }`}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default TopFilterTabs;
