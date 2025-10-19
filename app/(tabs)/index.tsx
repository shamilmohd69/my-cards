import Card from "@/components/card";
import TopFilterTabs from "@/components/topFilterTabs";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
import CustomBottomSheet from "../../components/bottomSheet";


export default function Index() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [activeTab, setActiveTab] = useState("All");

    const snapPoints = useMemo(() => ['40%', '50%', '90%'], []);
    const tabs = ["All", "Identity Card", "Driving Licence", "Passport", "Bank Card"];

    const { dismiss } = useBottomSheetModal();



    const handleOpenBottomSheet = () => {
        bottomSheetRef.current?.present();

    }




    return (
        <View
            className="bg-black flex-1 relative "
        >
            <StatusBar barStyle="light-content" />
            <View className="flex">
                <TopFilterTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </View>
            <Card
                title="Aadhaar Card"
                subtitle={`भारत सरकार \n Government of India `}
                description="dd"
                bgColor="white"
                textColor="black"
                primaryImage="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2Ti1hsmjiuaJUHUflORI1kxHy_f6sLn5ryhV6mtKidwbRLV8jz5f6PlHKtlkdrAsb8iuOOPd_ruzUv1bBNIIxbp9N30WVnkX7C4xLo2ZTwr2BhctxG3iVfNaYik0ArCGzkwzD9KD6ZLY/s1600/Emblem_of_India.png"
                secondaryImage="https://brandlogos.net/wp-content/uploads/2025/03/aadhaar-logo_brandlogos.net_cuek9-512x332.png"
                bottomText="मेरा आधार, मेरी पहचान"
                documentNumber="123456789012"
                fullName="Shamil Mohd"
                dateOfBirth="01/01/1990"
                address="123, Sample Street, City, Country"
            />

            <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={() => console.log("Long press detected!")}
                className="absolute bottom-6 right-6 bg-[#d71921] w-16 h-16 rounded-full justify-center items-center shadow-lg"
                onPress={() => handleOpenBottomSheet()}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
            <CustomBottomSheet
                ref={bottomSheetRef}
                title="Add New Card"
                snapPoints={snapPoints}
            />
        </View>
    );
}