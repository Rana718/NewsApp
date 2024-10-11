import { Text, useWindowDimensions, View, ViewToken } from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { NewsDataType } from "@/types";
import SliderItem from "./SliderItem";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, scrollTo, useSharedValue } from "react-native-reanimated";
import Pagination from "./Pagination";

type Props = {
    newsList: Array<NewsDataType>;
};

export default function BreakingNews({ newsList }: Props) {
    const [data, setData] = useState(newsList);
    const [pageinationIndex, setPageinationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);
    const {width} = useWindowDimensions();


    useEffect(() =>{
        if(isAutoPlay === true){
            interval.current = setInterval(() =>{
                offset.value = offset.value + width;
            }, 5000);
        }else{
            clearInterval(interval.current);
        }
        return()=>{
            clearInterval(interval.current);
        };
    }, [isAutoPlay, offset, width]);

    useDerivedValue(()=>{
        scrollTo(ref, offset.value, 0, true);
    });
    

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: (event)=>{
            offset.value = event.contentOffset.x;
        },
    })

    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0] && viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
            setPageinationIndex(viewableItems[0].index % newsList.length);
        }
    }, [newsList.length]);
    
    

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    }

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged }, 
    ]);


    return (
        <View className="mb-5">
            <Text className="text-xl font-semibold text-black mb-3 ml-5">Breaking News</Text>
            <View className="justify-center">
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_items${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX}/>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=> setData([...data, ...newsList])}
                    viewabilityConfigCallbackPairs={
                        viewabilityConfigCallbackPairs.current
                    }
                    onScrollBeginDrag={()=>{
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={()=>{
                        setIsAutoPlay(true);
                    }}
                />
                
            </View>

            <Pagination items={newsList} scollX={scrollX} pageinationIndex={pageinationIndex}/>
        </View>
    );
}
