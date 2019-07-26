import React from "react"
import AppRouter from "../src/router"
import { MuiThemeProvider } from "@material-ui/core/styles"
import theme from "./theme"
import "./App.css"

function App() {
  return (
    
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  )
}

export default App
