import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BottomTab() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        height: 65,
      }}
    >
      <BlurView
        intensity={70}
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            marginHorizontal: 30,
            justifyContent: "space-between",
          }}
        >
          <Feather name="map" color="#FFF" size={20} />
          <TouchableOpacity onPress={() => navigation.navigate("Param")}>
            <Ionicons name="ios-list" color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}
