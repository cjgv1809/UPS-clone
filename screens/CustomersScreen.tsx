import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { GET_CUSTOMERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import CustomerCard from "../components/CustomerCard";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { data, loading, error } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#59C1CC" : color }}>Customers</Text>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#59C1CC" }}>
        <Image
          source={{ uri: "https://links.papareact.com/3jc" }}
          containerStyle={tw("w-full h-64")}
          PlaceholderContent={
            <ActivityIndicator color="#FFFFFF" size="large" />
          }
        />

        <Input
          placeholder="Search by customer"
          value={input}
          onChangeText={(text) => setInput(text)}
          containerStyle={tw("bg-white pt-5 pb-0 px-10")}
        />

        <View style={tw("pb-14")}>
          {data?.getCustomers
            ?.filter((customer: CustomerList) =>
              customer.value.name.includes(input)
            )
            .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
              <CustomerCard key={ID} email={email} name={name} userId={ID} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomersScreen;
