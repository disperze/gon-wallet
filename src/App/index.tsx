import * as React from "react"

import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import {
  ChakraProvider,
} from "@chakra-ui/react"
import {
  Account,
  AccountToken,
  Create,
  HomePage,
  MintNFT,
} from "./pages"
import { SdkProvider } from "./services/client/wallet"
import { config } from "../config";
import theme from "./theme"
import { Navbar } from "./components"

export const App = () => (
  <ChakraProvider theme={theme}>
    <SdkProvider config={config}>

        <Router>
          <Navbar />
          <Route
            path="/create"
            component={Create}
          />
          <Route
            path="/mint/nft"
            component={MintNFT}
          />
          <Route
            exact
            path="/tokens"
            component={AccountToken}
          />
          <Route
            path="/account/:user"
            component={Account}
          />
          <Route
            exact
            path="/"
            component={HomePage}
          />
          {/* <Route component={() => <Redirect to="/" />} /> */}
          </Router>
    </SdkProvider>
  </ChakraProvider>
)
