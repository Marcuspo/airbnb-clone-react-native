import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Link, Tabs } from "expo-router"
import { useAuth, useUser } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"
import { defaultStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"
import { TextInput } from "react-native-gesture-handler"
import * as ImagePicker from "expo-image-picker"

const Page = () => {
  const { signOut, isSignedIn } = useAuth()
  const { user } = useUser()

  const [firstName, setFirstName] = useState(user?.firstName ?? "John")
  const [lastName, setLastName] = useState(user?.lastName ?? "Doe")
  const [email, setEmail] = useState(
    user?.emailAddresses[0]?.emailAddress ?? "<EMAIL>"
  )
  const [loadingImage, setLoadingImage] = useState(false)

  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!user) return

    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.emailAddresses[0].emailAddress)
  }, [user])

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName,
        lastName: lastName,
      })
    } catch (error) {
      console.log("✏️ ~ error:", error)
    } finally {
      setEdit(false)
    }
  }

  const onCaptureImage = async () => {
    setLoadingImage(true)

    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    })

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      user?.setProfileImage({
        file: base64,
      })
      setLoadingImage(false)
    } else {
      setLoadingImage(false)
    }
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage} disabled={loadingImage}>
            {loadingImage ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            )}
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={defaultStyles.inputField}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={defaultStyles.inputField}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={{ fontSize: 22, fontFamily: "mon-b" }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={{ fontFamily: "mon-sb" }}> {email}</Text>
          <Text>Since: {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && <Button title="Log out" onPress={() => signOut()} />}

      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button title="Log in" color={Colors.dark} />
        </Link>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontFamily: "mon-sb",
    fontSize: 24,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowColor: "#000",
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.grey,
  },
  editRow: {
    height: 50,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
})

export default Page
