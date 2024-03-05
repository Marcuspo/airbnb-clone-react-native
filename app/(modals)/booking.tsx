import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native"
import React, { useState } from "react"
import { Tabs, useRouter } from "expo-router"
import { BlurView } from "expo-blur"
import Animated, { FadeIn, FadeOut, SlideInDown } from "react-native-reanimated"
import { defaultStyles } from "@/constants/Styles"
import { Ionicons } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import { places } from "@/assets/data/places"

// @ts-ignore
import DatePicker from "react-native-modern-datepicker"

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const guestsGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
]

const Page = () => {
  const router = useRouter()
  const [openCard, setOpenCard] = useState(0)
  const [selectedPlace, setSelectedPlace] = useState(0)
  const today = new Date().toISOString().substring(0, 10)
  const [groups, setGroups] = useState(guestsGroups)

  const onClearAll = () => {
    setSelectedPlace(0)
    setOpenCard(0)
    setGroups(guestsGroups)
  }

  return (
    <BlurView intensity={70} tint="light" style={styles.container}>
      <Animated.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.card}>
          {openCard != 0 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(0)}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>Where</Text>
              <Text style={styles.previewData}>I'm Flexible</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard === 0 && (
            <>
              <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                Where to?
              </Animated.Text>
              <Animated.View style={styles.cardBody}>
                <View style={styles.searchSection}>
                  <Ionicons
                    name="search"
                    size={20}
                    color="black"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Search destination"
                    placeholderTextColor={Colors.grey}
                  />
                </View>
              </Animated.View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 25,
                  paddingLeft: 20,
                  marginBottom: 30,
                  paddingRight: 20,
                }}
              >
                {places.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedPlace(index)}
                  >
                    <Image
                      source={item.img}
                      style={
                        selectedPlace === index
                          ? styles.placeSelected
                          : styles.place
                      }
                    />
                    <Text
                      style={[
                        { fontFamily: "mon", paddingTop: 6 },
                        selectedPlace === index
                          ? { fontFamily: "mon-sb" }
                          : { fontFamily: "mon" },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
        </View>

        <View style={styles.card}>
          {openCard != 1 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(1)}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>when</Text>
              <Text style={styles.previewData}>Any week</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard === 1 && (
            <>
              <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                When's your trip?
              </Animated.Text>
              <Animated.View style={styles.cardBody}>
                <DatePicker
                  current={today}
                  mode="calendar"
                  selected={today}
                  options={{
                    defaultFont: "mon",
                    borderColor: "transparent",
                    headerFont: "mon-sb",
                    mainColor: Colors.primary,
                    borderRadius: 8,
                  }}
                />
              </Animated.View>
            </>
          )}
        </View>

        <View style={styles.card}>
          {openCard != 2 && (
            <AnimatedTouchableOpacity
              onPress={() => setOpenCard(2)}
              style={styles.cardPreview}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.previewText}>Who</Text>
              <Text style={styles.previewData}>Add guests</Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard === 2 && (
            <>
              <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                Who's coming?
              </Animated.Text>
              <Animated.View style={styles.cardBody}>
                {groups.map((group, index) => (
                  <View
                    key={index}
                    style={[
                      styles.guestItem,
                      index + 1 < guestsGroups.length
                        ? styles.itemBorder
                        : null,
                    ]}
                  >
                    <View>
                      <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                        {group.name}
                      </Text>
                      <Text style={{ fontFamily: "mon", fontSize: 14 }}>
                        {group.text}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          const newGroups = [...groups]
                          newGroups[index].count--
                          setGroups(newGroups)
                        }}
                        disabled={groups[index].count === 0}
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={26}
                          color={
                            groups[index].count > 0 ? Colors.grey : "#CDCDCD"
                          }
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontFamily: "mon",
                          fontSize: 16,
                          textAlign: "center",
                        }}
                      >
                        {group.count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newGroups = [...groups]
                          newGroups[index].count++
                          setGroups(newGroups)
                        }}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={26}
                          color={Colors.grey}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </Animated.View>
            </>
          )}
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={onClearAll}
            style={{ justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}
          >
            <Ionicons
              style={defaultStyles.btnIcon}
              name="search-outline"
              size={24}
              color="white"
            />
            <Text style={[defaultStyles.btnText]}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
    gap: 20,
  },
  previewData: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  previewText: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-b",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    borderColor: "#ABABAB",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignContent: "center",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderColor: Colors.grey,
  },
  placeSelected: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 2,
  },
  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
})

export default Page
