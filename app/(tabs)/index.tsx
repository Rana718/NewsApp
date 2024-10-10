import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";

type Props = {};

export default function Page({}: Props) {
    const { top: safeTop } = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(true);
    const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

    useEffect(()=>{
        getBreakingNews();
    }, []);

    const getBreakingNews = async () => {
        try{
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`
            const response = await axios .get(URL);

            if(response && response.data){
                setBreakingNews(response.data.results);
                setIsLoading(false);
            }

        }catch(e: any){
            console.log(e);
        }
    }

    return(
        <View className="flex-1 " style={{ paddingTop: safeTop }}>
            <Header/>
            <SearchBar/>
            {isLoading ?(
                <ActivityIndicator size={"large"}/>
            ): (
                <BreakingNews newsList={breakingNews}/>
            )}
            
        </View>
    )
}