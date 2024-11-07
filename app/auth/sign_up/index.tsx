import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from "@/components/CustomButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/FirebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { doc, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';  
import Loading from "@/components/Loading";

export default function SignUp() {
    const { top: safetop } = useSafeAreaInsets();
    const router = useRouter();
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [photoURL, setPhotoURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            ToastAndroid.show("Permission to access gallery is required!", ToastAndroid.BOTTOM);
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            setImage(pickerResult.assets[0].uri);
            setPhotoURL(pickerResult.assets[0].uri);
            console.log(pickerResult.assets[0].uri);
        }
    };

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            ToastAndroid.show('Please enter all fields', ToastAndroid.BOTTOM);
            return;
        }
        try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    name: name,
                    photoURL: photoURL,
                    provider: 'firebase',
                    createdAt: new Date(),
                });
                setIsLoading(false);
                ToastAndroid.show('Account created successfully', ToastAndroid.BOTTOM);
                router.replace("/(tabs)");
            }
        } catch (e: any) {
            setIsLoading(false);
            ToastAndroid.show(e.message, ToastAndroid.BOTTOM);
        }
    };

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

                    <View className="mt-6">
                        <Text className="text-gray-700 text-lg mb-2">Full Name</Text>
                        <TextInput
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 bg-gray-100"
                        />

                        <Text className="text-gray-700 text-lg mb-2 mt-2">Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 bg-gray-100"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text className="text-gray-700 text-lg mt-2 mb-2">Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 bg-gray-100"
                        />
                    </View>

                    <View className="mt-10">
                        <Text className="text-gray-700 text-2xl font-semibold mb-2 text-center">Profile Picture</Text>
                        {!image ? (
                            <View className="flex-1 items-center justify-center mt-4">
                                <TouchableOpacity onPress={pickImage} className="border border-black w-28 h-7 py-1 rounded-lg text-base bg-slate-300">
                                    <Text className="text-gray-700 text-center font-semibold">Select Image</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="flex-1 justify-center items-center mt-4">
                                
                                <TouchableOpacity onPress={pickImage}>
                                    <Image source={{ uri: image }} className="w-24 h-24 rounded-full" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>


                    <View className="mt-12">
                        <CustomButton
                            title="Sign Up"
                            onPress={handleSignUp}
                            textStyle="text-white text-center text-lg font-semibold"
                            containerStyle="bg-blue-600 rounded-full py-4"
                        />
                    </View>
                    <View className="mt-5 mb-10">
                        <CustomButton
                            title="Sign In"
                            onPress={() => router.back()}
                            textStyle="text-black text-center text-lg font-semibold"
                            containerStyle="rounded-full border border-black py-4"
                        />
                    </View>
                </ScrollView>
            </View>

            {isLoading && (
                <View style={{position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1}}>

                        <Loading size={"large"}/>

                </View>
            )}
        </>
    );
}
