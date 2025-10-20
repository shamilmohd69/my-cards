import Card from "@/components/card";
import TopFilterTabs from "@/components/topFilterTabs";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from "react";
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import CustomBottomSheet from "../../components/bottomSheet";


export default function Index() {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [activeTab, setActiveTab] = useState("All");

    const snapPoints = useMemo(() => ['40%', '50%', '90%'], []);
    const tabs = ["All", "Identity Card", "Driving Licence", "Passport", "Bank Card"];

    const cardData = [
        {
            title: "Aadhaar Card",
            documentNumber: "123456789012",
            fullName: "Shamil Mohd",
            dateOfBirth: "01/01/1990",
            address: "123, Sample Street, City, Country",
            qrCodeImage: "https://docs.lightburnsoftware.com/legacy/img/QRCode/ExampleCode.png",
        },
        {
            title: "Debit Card",
            fullName: "Shamil Mohd",
            description: "Platinum",
            documentNumber: "1234567890123456",
            expireDate: "12/30",
            primaryImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjFzV2ttx1v_pdb2YN7ajP0bmEQlINGtzmA&s",
            secondaryImage: "https://cdn.iconscout.com/icon/free/png-256/free-mastercard-logo-icon-svg-download-png-2944982.png",
            bgImage: "https://media.istockphoto.com/id/1498657258/vector/abstract-dark-blue-blurred-defocused-gradient-background-with-dynamic-effect.jpg?s=612x612&w=0&k=20&c=vMPhXTUdwfOK04ZM7k7qRPahqb3EogVJSWI5NmFpo9U=",
        },
        {
            title: "Debit Card",
            fullName: "Shamil Mohd",
            description: "Gold",
            documentNumber: "1234567890123456",
            expireDate: "01/32",
            primaryImage: "https://logos-world.net/wp-content/uploads/2023/02/SBI-Logo.png",
            secondaryImage: "https://logos-world.net/wp-content/uploads/2020/06/Visa-Logo-2006.png",
            bgImage: "https://static.vecteezy.com/system/resources/thumbnails/006/413/046/small/orange-purple-red-blue-gradient-soft-abstract-background-you-can-use-this-background-for-your-content-like-as-technology-video-gaming-promotion-card-banner-sports-presentation-website-etc-vector.jpg",
        }
    ];

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
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} >
                {
                    cardData.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            qrCodeImage={card.qrCodeImage}
                            documentNumber={card.documentNumber}
                            fullName={card.fullName}
                            dateOfBirth={card.dateOfBirth}
                            address={card.address}
                            description={card.description}
                            expireDate={card.expireDate}
                            primaryImage={card.primaryImage}
                            secondaryImage={card.secondaryImage}
                            bgImage={card.bgImage}
                        />
                    ))
                }
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