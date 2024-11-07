import { ScrollView, } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NawsList from "@/components/NewsList";
import Loading from "@/components/Loading";

type Props = {};

export default function Page({}: Props) {
    const { top: safeTop } = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(true);
    const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [search, setSearch] = useState('');

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

    const getNews = async (category: string = '') => {
        try{
            let setcategory = ''
            if(category.length !== 0 && category !== 'All'){
                setcategory = `&category=${category}`
            }
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=10${setcategory}`
            const response = await axios .get(URL);

            if(response && response.data){
                setNews(response.data.results);
            }

        }catch(e: any){
            console.log(e);
        }
    }

    const onCatgoryPress = (category: string) => {
        setNews([])
        getNews(category);
    }

    return(
        <ScrollView className="flex-1 " style={{ paddingTop: safeTop }}>
            <Header/>

            <SearchBar setSearchQuery={setSearch} EnableButton={true}/>

            {isLoading ?(
                <Loading size={"large"}/>
            ): (
                <BreakingNews newsList={breakingNews}/>
            )}

            <Categories onCatgorySelect={onCatgoryPress}/>

            <NawsList newsList={news}/>
        </ScrollView>
    )
}