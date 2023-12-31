import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import "@/styles/index.scss";
const dotenv = require("dotenv");
dotenv.config();

const fonMainnet = {
  id: 201022,
  name: "FONSmartChain",
  network: "FON Chain",
  iconUrl:
    "https://cdn.dorahacks.io/static/files/188c028468557368d12717c46b1bd63e.jpg",
  iconBackground: "#fff",
  nativeCurrency: {
    name: "PG",
    symbol: "PG",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://fsc-dataseed1.fonscan.io"] },
    default: { http: ["https://fsc-dataseed2.fonscan.io"] },
  },
  blockExplorers: {
    default: { name: "fonscan", url: "https://fonscan.io" },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  const { publicClient, chains } = configureChains(
    [fonMainnet],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "",
    projectId: "2588db3d04914636093b01d564610991",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <GoogleOAuthProvider clientId="276764548749-kp580h77fv3bg9ofoeu5563saggg7jpo.apps.googleusercontent.com">
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              chains={chains}
              theme={lightTheme({
                accentColor: "#9333ea",
                accentColorForeground: "white",
                borderRadius: "medium",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        </GoogleOAuthProvider>
      ) : null}
    </>
  );
}
