import { Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";


type Props = {
    slideItem: NewsDataType,
    index: number,
    scollX: SharedValue<number>,
};

const {width} = Dimensions.get('screen');

export default function SilderItem({slideItem, index, scollX}: Props) {
    const rnStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {
                    translateX: interpolate(
                        scollX.value,
                        [(index -1 )*width, index*width, (index+1)*width],
                        [-width*0.15, 0, width*0.15],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scollX.value,
                        [(index-1)*width, index*width, (index+1)*width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    )
                }
            ]
        }
    })


    return(
        <Animated.View className="relative justify-center items-center" key={slideItem.article_id} style={[{width: width}, rnStyle]}>
            <Image className="h-[200px] rounded-3xl" source={{uri: slideItem.image_url}} style={{width: width-60}} />
            
            <LinearGradient className="absolute p-5 left-[30px] right-0 top-0 rounded-3xl h-[200px]" style={{width: width-60 }} colors={["transparent", "rgba(0,0,0,0.5)"]}>
                
                <View className="flex-row absolute top-[85px] px-4 items-center gap-2">
                    {slideItem.source_icon && (
                        <Image className="w-6 h-6 rounded-2xl" source={{uri: slideItem.source_icon}}/>
                    )}

                    <Text className="text-white text-xs font-semibold">
                        {slideItem.source_name}
                    </Text>

                </View>

                <Text className="text-[14px] text-white absolute top-[120px] px-4 font-semibold" numberOfLines={2}>
                    {slideItem.title}
                </Text>

            </LinearGradient>
            
        </Animated.View>
    )
}