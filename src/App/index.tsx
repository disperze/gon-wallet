import * as React from "react"

import {
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import {
  ChakraProvider,
} from "@chakra-ui/react"
import {
  Account,
  AccountToken,
  Landing,
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
            component={Landing}
          />
          {/* <Route component={() => <Redirect to="/" />} /> */}
          </Router>
    </SdkProvider>
  </ChakraProvider>
)
