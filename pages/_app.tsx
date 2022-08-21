import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/index.css";
import { client } from "../apollo";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
