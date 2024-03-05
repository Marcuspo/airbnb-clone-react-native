import { View, Text } from "react-native"
import React, { useMemo, useState } from "react"
import { Link, Stack } from "expo-router"
import ExploreHeader from "@/components/ExploreHeader"
import Listings from "@/components/Listings"
import listingsData from "@/assets/data/airbnb-listings.json"
import ListingsMap from "@/components/ListingsMap"

import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json"
import ListingsBottomSheet from "@/components/ListingsBottomSheet"

const Page = () => {
  const [category, setCategory] = useState("Tiny homes")
  const items = useMemo(() => listingsData as any, [])
  const geoitems = useMemo(() => listingsDataGeo as any, [])

  const onDatChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDatChanged} />,
        }}
      />

      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listing={geoitems} />
      <ListingsBottomSheet listing={items} category={category} />
    </View>
  )
}

export default Page
