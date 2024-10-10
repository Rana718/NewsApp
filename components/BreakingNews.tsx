import { FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import { NewsDataType } from "@/types";
import SliderItem from "./SliderItem";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

type Props = {
    newsList: Array<NewsDataType>;
};

export default function BreakingNews({ newsList }: Props) {
    const [data, setData] = useState(newsList);
    const [pageinationIndex, setPageinationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        }
    })


    return (
        <View className="mb-5">
            <Text className="text-xl font-semibold text-black mb-3 ml-5">Breaking News</Text>
            <View className="justify-center">
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_items${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scollX={scrollX}/>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                />
            </View>
        </View>
    );
}
