import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from 'react-native-paper';

export default function Search() {
    const API_KEY = "797d87539045726c3e9d6c13055395f3";

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");


async function fetchWeather() {
    if (!city) return;

    const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    if (data.cod !== 200) {
        setErrorMsg("City not found");
        setWeather(null);
        return;
    }

    setErrorMsg("");
    setWeather(data);
    }

async function addToFavorites() {
    const saved = await AsyncStorage.getItem("favorites");
    const favorites = saved ? JSON.parse(saved) : [];

    if (favorites.includes(city)) {
        setErrorMsg("City already added to Favorites");
        return;
    }

    favorites.push(city);
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));

    }

function clearSearch() {
    setCity("");
    setWeather(null);
    }

return (
    <View style={styles.container}>
    <TextInput
        label="Search city"
        value={city}
        onChangeText={setCity}
        mode="outlined"
        style={styles.input}
        />

    <Button mode="contained" onPress={fetchWeather} style={styles.button}>
        Search
    </Button>

    <Button mode="outlined" onPress={clearSearch} style={styles.button}>
        Clear
    </Button>

    {weather && (
        <Card style={styles.card}>
        <Card.Content>
            <Text variant="titleLarge">{weather.name}</Text>

            <Text variant="displaySmall">
            {Math.round(weather.main.temp)} °C
            </Text>

            <Text variant="bodyLarge">
            {weather.weather[0].description}
            </Text>
        </Card.Content>

        <Card.Actions>
            <Button onPress={addToFavorites}>Add to favorites ⭐</Button>
        </Card.Actions>
        </Card>
        )}
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
input: {
    marginBottom: 10,
    },
button: {
    marginTop: 10,
    },
card: {
    marginTop: 20,
    },
error: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
    },
});