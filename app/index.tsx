import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from "react-native-reanimated";


export default function App() {
    const router = useRouter();

    return (
        <View className="flex-1">
            <StatusBar style="light"/>
            <ImageBackground
                source={require("@/assets/images/getting-started.jpg")}
                className="flex-1"
                resizeMode="cover"
            >
                <View className="flex-1 justify-end pb-20 px-10 gap-6 bg-black/30">

                    <Animated.Text className="text-white text-3xl font-bold text-center" entering={FadeInLeft.delay(300).duration(500)}>
                        Stay Updated!!!
                    </Animated.Text>

                    <Animated.Text className="text-white text-xl text-center" entering={FadeInRight.delay(700).duration(500)}>
                        Get the latest news and updates on your favorite topics
                    </Animated.Text>

                    <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
                        <TouchableOpacity className="bg-tint py-5 mt-5 rounded-2xl items-center" onPress={() => router.replace("/(tabs)")}>
                            <Text className="text-white text-xl font-bold">Go to Home</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

            </ImageBackground>

        </View>
    );
}