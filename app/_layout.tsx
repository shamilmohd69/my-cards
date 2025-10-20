import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SpaceGrotesk": require("../assets/fonts/SpaceGrotesk.ttf"),
    "Doto-Medium": require("../assets/fonts/Doto-Medium.ttf"),
    "Doto-Bold": require("../assets/fonts/Doto-Bold.ttf"),
  });

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
