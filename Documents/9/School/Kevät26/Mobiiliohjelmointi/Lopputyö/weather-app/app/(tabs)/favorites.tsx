import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage  from '@react-native-async-storage/async-storage';


export default function Favorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

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
    useEffect(() => {
    getFavorites();
    }, []);

    return (
    <View style={styles.container}>
        <Text style={styles.title}> Favorites </Text>
    {favorites.length === 0 ? (
        <Text style={styles.text}>No favorites yet</Text>
    ) : (
        favorites.map((city, index) => (
        <Text key={index} style={styles.text}>
            {city}
        </Text>
        ))
    )}
</View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    },
title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    padding: 20,
},
text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    },
input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    color: "white",
    }
});