import { defaultStyles } from "@/constants/Styles"
import { useRouter } from "expo-router"
import React, { Component, memo, useMemo } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Animated from "react-native-reanimated"
import MapView from "react-native-map-clustering"

interface Props {
  listing: any
}

const INITIAL_REGION = {
  latitude: 52.525733,
  longitude: 13.389016,
  latitudeDelta: 9,
  longitudeDelta: 9,
}

const ListingsMap = memo(({ listing }: Props) => {
  const router = useRouter()

  const onMarkerSelecterd = (item: any) => {
    router.push(`/listing/${item.properties.id}`)
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster
    const points = properties.point_count

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "mon-sb",
              fontSize: 12,
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    )
  }

  return (
    <Animated.View style={defaultStyles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        animationEnabled={false}
        clusterColor="#FFF"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listing.features.map((item: any) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelecterd(item)}
            coordinate={{
              latitude: item.properties.latitude,
              longitude: item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>$ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "#FFF",
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
})

export default ListingsMap
