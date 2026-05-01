import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Card, Text } from "react-native-paper";

import * as Location from "expo-location";

export default function Home() {
  const API_KEY = "797d87539045726c3e9d6c13055395f3";

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);

useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
    }, []);

  useEffect(() => {
    if (!location) return;

  async function fetchWeather() {
    const lat = location!.coords.latitude;
    const lon = location!.coords.longitude;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();
    setWeather(data);
  }

  fetchWeather();
  }, [location]);

return (
  <View style={{ flex: 1 }}>
    
    {location && (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </MapView>
    )}

  <Card style={styles.card}>
    <Card.Content>
      {weather ? (
      <>
      <Text variant="titleLarge">{weather.name}</Text>
        <Text variant="displaySmall">
          {Math.round(weather.main.temp)} °C
          </Text>
        <Text variant="bodyLarge">
        {weather.weather[0].description}
        </Text>
      </>
        ) : location ? (
      <Text>Loading weather...</Text>
        ) : errorMsg ? (
      <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <Text>Loading location...</Text>
        )}
      </Card.Content>
    </Card>
  </View>
  );
}

const styles = StyleSheet.create({
card: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    },
error: {
    color: "red",
    textAlign: "center",
    },
});