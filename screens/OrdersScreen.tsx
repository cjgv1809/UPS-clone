import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn";
import { Button, Image } from "@rneui/themed";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import useOrders from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const tw = useTailwind();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color }}>Orders</Text>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
        <Image
          source={{ uri: "https://links.papareact.com/m51" }}
          containerStyle={tw("w-full h-64")}
          PlaceholderContent={
            <ActivityIndicator color="#FFFFFF" size="large" />
          }
        />

        <View>
          <Button
            color="pink"
            titleStyle={{ color: "gray", fontWeight: "400" }}
            style={tw("py-2 px-5")}
            onPress={() => setAscending(!ascending)}
          >
            {ascending
              ? "Showing: Oldest First"
              : "Showing: Most Recent First "}
          </Button>

          <View style={tw("pb-14")}>
            {orders
              ?.sort((a, b) =>
                new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
              )
              .map((order) => (
                <OrderCard key={order.trackingId} item={order} />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;
