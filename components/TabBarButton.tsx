import { Pressable } from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/constants/icons";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

interface TabBarButtonProps {
    onPress: () => void;
    onLongPress: () => void;
    isFocused: boolean;
    routeName: keyof typeof icon;
    label: string;
}

export default function TabBarButton({ onPress, onLongPress, isFocused, routeName, label }: TabBarButtonProps) {
    const opacity = useSharedValue(0);

    useEffect(()=>{
        opacity.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused? 1: 0): isFocused,
            { duration: 50}
        );
    }, [opacity, isFocused]);

    const animatedTextStyle = useAnimatedStyle(()=>{
        const opacityValue = interpolate(opacity.value, [0, 1], [1, 0]);
        return{
            opacity: opacityValue,
        };
    });


    return(
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 justify-center items-center gap-1"
        >
            {icon[routeName]({
                color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
                focused: isFocused,
            })}

            <Animated.Text
                style={animatedTextStyle}
                className={`text-xs ${isFocused? Colors.tabIconSelected : Colors.tabIconDefault}`}
            >{label}</Animated.Text>

        </Pressable>
    )

}