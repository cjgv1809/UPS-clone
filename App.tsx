import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { APP_ENV } from "react-native-dotenv";

const client = new ApolloClient({
  uri: "https://caceres.stepzen.net/api/handy-anteater/graphql",
  headers: {
    Authorization: `${APP_ENV}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore - TailwindProvider is not typed
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
