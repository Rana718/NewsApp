import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from "react-native-reanimated";

type Props = {
    label: string;
    checked: boolean;
    onPress: () => void;
};

export default function CheckBox({ label, checked, onPress }: Props) {
    const rnAinmation = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(
                checked ? "rgba(239, 142, 82, 0.2)" : "transparent",
                { duration: 200 }
            ),
            borderColor: withTiming(checked ? Colors.tint : Colors.black, {
                duration: 200
            }),

            paddingLeft: 16,
            paddingRight: checked ? 10 : 16
        }
    }, [checked])

    const rnText = useAnimatedStyle(() => {
        return {
            color: withTiming(checked ? Colors.tint : Colors.black, {
                duration: 200,
            }),
        };
    }, [checked])

    return (
        <Animated.View 
            className="flex-row justify-center items-center border border-black rounded-full py-2 mx-1 my-1 space-x-1" 
            style={rnAinmation} onTouchEnd={onPress} layout={LinearTransition.springify().mass(0.8)}
        >

            <Animated.Text className="text-[14px] text-black" style={rnText}>
                {label}
            </Animated.Text>
            {checked && (
                <Animated.View entering={FadeIn.duration(350)} exiting={FadeOut.duration(350)}>
                    <AntDesign name="checkcircle" size={14} color={Colors.tint} />
                </Animated.View>
            )}
        </Animated.View>
    )
}