import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function city () {
    const API_KEY = "797d87539045726c3e9d6c13055395f3";

    const { city } = useLocalSearchParams();

    const [weather, setWeather] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

useEffect(() => {
    if (!city) return;

    async function fetchWeather() {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

    const data = await response.json();

    if (data.cod !== 200) {
        setErrorMsg("City not found");
        return;
        }

        setWeather(data);
    }

    fetchWeather();
    }, [city]);

return (
    <View style={styles.container}>
    {weather ? (
        <Text style={styles.text}>
        🌍 {weather.name}{"\n"}
        🌡️ {weather.main.temp} °C{"\n"}
        ☁️ {weather.weather[0].description}
        </Text>
    ) : errorMsg ? (
        <Text style={styles.text}>{errorMsg}</Text>
    ) : (
        <Text style={styles.text}>Loading weather...</Text>
    )}
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
    }
});