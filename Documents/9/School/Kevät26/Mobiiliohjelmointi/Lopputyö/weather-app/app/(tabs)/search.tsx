import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Search() {
    const API_KEY = "797d87539045726c3e9d6c13055395f3";

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");


async function fetchWeather() {
    console.log("BUTTON PRESSED", city);
    if (!city) return;

    const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();
    console.log("API RESPONSE:", data);

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

    async function clearSearch() {
    setCity("");
    setWeather(null);
    }

return (
    <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Search city..."
        value={city}
        onChangeText={setCity}
        />

        <Button title="Search" onPress={fetchWeather} />
        <Button title="Clear" onPress={clearSearch} />

    {weather && (
        <Text style={styles.text}>
        🌍 {weather.name}{"\n"}
        🌡️ {weather.main.temp} °C{"\n"}
        ☁️ {weather.weather[0].description}
        </Text>
        )}
        <Button title="Add to favorites ⭐️" onPress={addToFavorites} />
        {errorMsg ? (
    <Text style={styles.errorText}>{errorMsg}</Text>
    ) : null}
    </View>
    );
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
    },
    errorText: {
    color: "red",
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
    },
});