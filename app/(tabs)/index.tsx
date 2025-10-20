import Card from "@/components/card";
import TopFilterTabs from "@/components/topFilterTabs";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from "react";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
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
            <ScrollView>
                <Card
                    title="Aadhaar Card"
                    description="dd"
                    qrCodeImage="https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png"
                    documentNumber="123456789012"
                    fullName="Shamil Mohd"
                    dateOfBirth="01/01/1990"
                    address="123, Sample Street, City, Country"
                />
                <Card
                    title="Debit Card"
                    fullName="Shamil Mohd"
                    description="Platinum"
                    documentNumber="1234567890123456"
                    expireDate="12/30"
                    primaryImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjFzV2ttx1v_pdb2YN7ajP0bmEQlINGtzmA&s"
                />
            </ScrollView>
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