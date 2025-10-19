import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "Home",
            }}
          />

        </Stack>

      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
