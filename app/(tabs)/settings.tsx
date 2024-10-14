import { Switch, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { signOut } from "firebase/auth";
import { auth } from "@/FirebaseConfig";
import Loading from "@/components/Loading";

type Props = {};

export default function Settings({}: Props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(()=>{
        ToastAndroid.show("the setting page is still under development", ToastAndroid.LONG);
    }, [])

    const handleLogout = async () => {
        try{
            setIsLoading(true);
            await signOut(auth);
            ToastAndroid.show("logout successfully", ToastAndroid.SHORT);
            setIsLoading(false);
            router.replace("/auth/sign_in");

        }catch(e:any){
            setIsLoading(false);
            console.log(e.message);
            ToastAndroid.show(e.message, ToastAndroid.SHORT);
        }
    }

    

    return(
        <>
            <Stack.Screen options={{
                headerShown: true,
                title: "Settings"
            }} />

            <View className="flex-1 p-5">
                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">About</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">Send Feedback</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">Privacy Policy</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 py-4">
                    <Text className="text-[16px] font-medium text-black">Terms of Use</Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={16}
                        color={Colors.lightGrey}
                    />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between bg-white px-5 pt-4">
                    <Text className="text-[16px] font-medium text-black">Dark Mode</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: 'Colors.tint'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    className="flex-row justify-between bg-white px-5 pt-2 pb-4"
                    onPress={()=>handleLogout()}
                >
                    <Text className="text-[16px] font-bold text-red-500">Logout</Text>
                    <MaterialIcons
                        name="logout"
                        size={24}
                        color={"red"}
                    />
                </TouchableOpacity>
            </View>

            {isLoading && (
                <View style={{
                    position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1
                }}>
                    <Loading size={"large"} color={Colors.tint} />
                </View>
            )}
        </>
    )
}