import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from "@/components/CustomButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/FirebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";


export default function SignUp() {
    const { top: safetop } = useSafeAreaInsets();
    const router = useRouter();
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const handleSignUp = () => {
        if (!name && !email && !password) {
            ToastAndroid.show('Please enter all fields', ToastAndroid.BOTTOM);
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                ToastAndroid.show('Sign Up Successful!', ToastAndroid.BOTTOM);
                router.replace('/(tabs)');

            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                ToastAndroid.show(`Error: ${errorMessage}`, ToastAndroid.BOTTOM);

            });
    }


    return (
        <>
            <StatusBar style="dark" />
            <View className="flex-1 px-6 bg-white" style={{ paddingTop: safetop }}>
                <TouchableOpacity onPress={() => router.back()}>

                    <AntDesign name="arrowleft" size={32} color="black" />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text className="text-left text-4xl font-bold text-blue-600 pt-3">
                        Create New Account
                    </Text>

                    <View className="mt-10">

                        <Text className="text-gray-700 text-lg mb-2">FullName</Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={name}
                            onChangeText={setName}
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 bg-gray-100"
                        />

                        <Text className="text-gray-700 text-lg mb-2 mt-6">Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 bg-gray-100"
                        />


                        <Text className="text-gray-700 text-lg mt-6 mb-2">Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 bg-gray-100"
                        />
                    </View>

                    <View className="mt-12">
                        <CustomButton
                            title="Sign Up"
                            onPress={handleSignUp}
                            textStyle="text-white text-center text-lg font-semibold"
                            containerStyle="bg-blue-600 rounded-full py-4"
                        />
                    </View>
                    <View className="mt-5">
                        <CustomButton
                            title="Sign In"
                            onPress={() => router.back()}
                            textStyle="text-black text-center text-lg font-semibold"
                            containerStyle="rounded-full border border-black py-4"
                        />
                    </View>
                </ScrollView>

            </View>
        </>
    )
}