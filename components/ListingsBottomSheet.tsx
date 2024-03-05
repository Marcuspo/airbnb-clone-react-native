import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import React, { useMemo, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import Listings from "./Listings"
import BottomSheet from "@gorhom/bottom-sheet/"
import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"

interface Props {
  listing: any[]
  category: string
}

const ListingsBottomSheet = ({ listing, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["10%", "100%"], [])
  const [refresh, setRefresh] = useState(0)

  const showMap = () => {
    bottomSheetRef.current?.collapse()
    setRefresh(refresh + 1)
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      enablePanDownToClose={false}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings refresh={refresh} listings={listing} category={category} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={{ fontFamily: "mon-sb", color: "white" }}>Map</Text>
            <Ionicons name="map" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
})

export default ListingsBottomSheet
