import { Redirect } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/FirebaseConfig";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "@/components/Loading";
import Landing from "@/components/Landing";


export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setIsLoading(true);

            if (currentUser) {
                setUser(currentUser);
                await AsyncStorage.setItem("user", JSON.stringify(currentUser));
            } else {
                setUser(null);
                await AsyncStorage.removeItem("user");
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Loading size={"large"} />
            </View>
        )
    }

    return (
        <View className="flex-1">
            {user ? <Redirect href={'/(tabs)'}/>: <Landing/>}
        </View>
    );
}