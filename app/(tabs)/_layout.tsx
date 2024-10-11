import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { StatusBar } from "expo-status-bar";


export default function TabLayout() {
    return (
        <>
            <StatusBar style="dark"/>
            <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>

                <Tabs.Screen name="index" options={{ title: "Home" }} />

                <Tabs.Screen name="discover" options={{ title: "Discover" }} />

                <Tabs.Screen name="saved" options={{ title: "Saved" }} />

                <Tabs.Screen name="settings" options={{ title: "Settings" }} />

            </Tabs>
        </>
    )
}