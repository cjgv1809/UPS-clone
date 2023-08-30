import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://caceres.stepzen.net/api/handy-anteater/graphql",
  headers: {
    Authorization:
      "apikey caceres::stepzen.io+1000::6bdfcf3d13253912d39421707aeef79dd43383fbb6d92df771f393a5fb4db253",
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
