import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { Text, View } from "react-native";

interface Props {
    title: string;
    snapPoints?: string[];
}

const renderBackdrop = useCallback(
    (props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
        />
    ),
    []
);

type Ref = BottomSheetModal;

const customBottomSheet = forwardRef<Ref, Props>((props, ref) => {

    return (
        <BottomSheetModal
            ref={ref}
            index={1}
            backdropComponent={renderBackdrop}
            snapPoints={props.snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: '#0F0E0E' }}
            handleIndicatorStyle={{ backgroundColor: '#888', marginTop: 8 }}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
        >
            <BottomSheetView className="p-4 ">
                <Text className="text-white text-center font-bold text-base">{props.title}</Text>
                <View className="mt-4">
                    <Text className="text-white">Card Name</Text>
                    <BottomSheetTextInput
                        placeholder="Name"
                        placeholderTextColor="#888"
                        className="text-white mt-4 mb-2 border border-gray-700 rounded-md p-3 bg-[#1E1C1C]"
                    />

                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default customBottomSheet;
