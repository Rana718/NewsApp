import { View, LayoutChangeEvent } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { icon } from "@/constants/icons";


export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
    const buttonWidth = dimensions.width / state.routes.length;

    const onTabbarLayout = (event: LayoutChangeEvent) => {
        setDimensions({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
        });
    };

    const tabPositionX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        };
    });


    return (
        <View onLayout={onTabbarLayout} className="flex-row pt-4 pb-10 bg-white">
            <Animated.View
                style={[
                    animatedStyle,
                    { backgroundColor: Colors.tint}
                ]}
                className="absolute top-13 left-8 h-2 w-10"
            />

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withTiming(buttonWidth * index, {
                        duration: 200,
                    });

                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name as keyof typeof icon}
                        label={label as string}
                    />
                )

            })}

        </View>
    )
}