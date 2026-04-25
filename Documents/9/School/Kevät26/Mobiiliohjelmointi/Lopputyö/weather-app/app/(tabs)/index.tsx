import { useEffect, useState } from "react";
import { Text, View, StyleSheet} from "react-native";
import MapView, { Marker } from 'react-native-maps';

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

    <View style={styles.container}>
      {weather ? (
        <Text style={styles.text}>
          🌍 {weather.name}{"\n"}
          🌡️ {weather.main.temp} °C{"\n"}
          ☁️ {weather.weather[0].description}
        </Text>
      ) : location ? (
        <Text style={styles.text}>Loading weather...</Text>
      ) : errorMsg ? (
        <Text style={styles.text}>{errorMsg}</Text>
      ) : (
        <Text style={styles.text}>Loading location...</Text>
      )}
    </View>

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
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});


//https://docs.expo.dev/versions/latest/sdk/location/
