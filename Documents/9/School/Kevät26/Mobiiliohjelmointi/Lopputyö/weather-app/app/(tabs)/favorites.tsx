import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Button, Card, Text } from "react-native-paper";


export default function Favorites() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [errorMsg, setErrorMsg] = useState("");
    
    const router = useRouter();

async function getFavorites() {
    try {
        const data = await AsyncStorage.getItem("favorites");

        if (data) {
        setFavorites(JSON.parse(data));
        }
    } catch (error) {
        console.log("Error loading favorites");
        }
    }

    useFocusEffect(
    useCallback(() => {
        getFavorites();
    }, [])
);

async function removeFavorite(cityToRemove: string) {
    const updated = favorites.filter((city) => city !== cityToRemove);
    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    }


function renderRightActions(city: string) {
    return (
    <Pressable onPress={() => removeFavorite(city)}>
        <View style={styles.deleteBox}>
        <Text style={styles.deleteText}>
            Delete
        </Text>
        </View>
    </Pressable>
    );
}

async function clearFavorites() {
    await AsyncStorage.removeItem("favorites");
    setFavorites([""]);
    setErrorMsg("Favorites cleared")
    }

return (
    <View style={styles.container}>
    <Text variant="headlineMedium" style={styles.title}>
    Favorites
    </Text>

    {favorites.length === 0 ? (
    <Text style={styles.text}>No favorites yet ☹</Text>
    ) : (
    favorites.map((city, index) => (
    <Swipeable
        key={index}
        renderRightActions={() => renderRightActions(city)}
        >
        <Card
            key={index}
            style={styles.card}
            onPress={() =>
                router.push({
                pathname: "/city",
                params: { city: city },
                })
            }>
            <Card.Content>
                <Text variant="titleMedium">{city}</Text>
            </Card.Content>
        </Card>
    </Swipeable>
            ))
        )}

    <Button mode="outlined" onPress={clearFavorites} style={styles.button}>
    Clear
    </Button>

    {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
},
text: {
    textAlign: "center",
},
title: {
    textAlign: "center",
    marginBottom: 20,
},
card: {
    marginBottom: 10,
},
button: {
    marginTop: 20,
},
error: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
},
deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
},
deleteText: {
    color: "white",
    fontWeight: "bold",
},
});