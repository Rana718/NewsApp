import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import newsCategoryList from "@/constants/Categories";

type Props = {
    onCatgorySelect: (category: string) => void;
};

export default function Categories({onCatgorySelect}: Props) {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = React.useState(0);

    useEffect(()=>{
        onCatgorySelect(newsCategoryList[0].slug);
    }, []);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measureLayout(
            scrollRef.current as any, 
            (x) => {
                scrollRef.current?.scrollTo({
                    x: x - 20, 
                    y: 0,
                    animated: true,
                });
            }
        );
        onCatgorySelect(newsCategoryList[index].slug);
    };

    return (
        <View>
            <Text className="text-xl font-semibold text-black mb-[10px] ml-5">
                Categories
            </Text>

            <ScrollView
                className="px-3"
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }} 
            >
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectCategory(index)}
                        ref={(el) => (itemRef.current[index] = el)}
                        className={`py-2 px-3 mr-2 rounded-2xl ${activeIndex === index ? 'bg-tint' : 'border border-gray-600'}`}
                    >
                        <Text
                            className={`text-[14px] ${
                                activeIndex === index ? 'text-white font-semibold' : 'text-black'
                            }`}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
