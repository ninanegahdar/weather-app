import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from 'react-native-paper';


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
<LinearGradient
        colors={['#f97dc8e1', 'transparent']}
        style={styles.background}
        />
    {weather ? (
        <Card style={styles.card}>
        <Card.Content>
        <Text variant="titleLarge">
            {weather.name}
            </Text>
        <Text variant="displaySmall">
            {Math.round(weather.main.temp)} °C
            </Text>
        <Text variant="bodyLarge">
            ☁️ {weather.weather[0].description}
            </Text>
        </Card.Content>
        </Card>
        ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
        ) : (
        <Text>Loading weather...</Text>
        
    )}
    </View>
    );
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    },
background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 450,
    },
card: {
    padding: 10,
    },
error: {
    textAlign: "center",
    color: "red",
    },
});