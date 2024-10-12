import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { NewsDataType } from "@/types";
import axios from "axios";
import Loading from "@/components/Loading";
import moment, { isMoment } from "moment";

type Params = {
    id?: string; 
}

type Props = {};

export default function NewsDetails({}: Props) {
    const { id } = useLocalSearchParams<Params>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getNews();
    },[]);

    const getNews = async () => {
        try{
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`
            const response = await axios .get(URL);

            if(response && response.data){
                setNews(response.data.results);
                setIsLoading(false);
            }

        }catch(e: any){
            console.log(e);
        }
    }

    return(
        <>
            <Stack.Screen
                options={{
                    headerLeft: ()=> (
                        <TouchableOpacity onPress={()=> router.back()}>
                            <Ionicons name="arrow-back" size={22}/>
                        </TouchableOpacity>
                    ),
                    headerRight: ()=>(
                        <TouchableOpacity onPress={()=>{}}>
                            <Ionicons name="heart-outline" size={22}/>
                        </TouchableOpacity>
                    ),
                    title: ''
                }}
            />
            {isLoading ? (
                <Loading size={"large"}/>
            ):(
                <ScrollView className="flex-1 bg-white px-5 pt-5 pb-5" >

                    <Text className="text-xl font-semibold text-gray-700 mb-2">
                        {news[0].title}
                    </Text>

                    <View className="flex-row justify-between mb-4">
                        <Text className="text-xs text-darkGrey">
                            {moment(news[0].pubDate).format("MMMM DD hh:mm a")}
                        </Text>

                        <Text className="text-xs text-darkGrey">
                            {news[0].source_name}
                        </Text>
                    </View>

                    <Image className="w-full h-[300px] mb-4 rounded-xl" source={{ uri: news[0].image_url}}/>

                    {news[0].content ? (
                        <Text className="text-[14px] text-darkGrey leading-6">
                            {news[0].content}
                        </Text>
                    ):(
                        <Text className="text-[14px] text-darkGrey leading-6">
                            {news[0].description}
                        </Text>
                    )}

                </ScrollView>
            )}
        </>
    )
}
