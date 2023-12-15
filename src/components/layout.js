import React, { useContext } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"
import "fontsource-roboto/400.css"
import "fontsource-roboto/700.css"

import { lightTheme, darkTheme } from "../styles/theme"
import { useDarkMode } from "../hooks"
import Context from "../context"
import GlobalStyle from "../styles/globalStyle"
import Header from "./header"
import Footer from "./footer"
import CookieBar from "../components/cookieBar"
import SplashScreen from "../components/splashScreen"
import { useCookieBar } from "../../config"

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]')
}

const StyledLayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`

const Layout = ({ children }) => {
  const { isIntroDone } = useContext(Context).state
  // Enables dark mode if the user's OS has an active dark theme
  // const darkModeEnabled = useDarkMode()
  const darkModeEnabled = false
  const theme = darkModeEnabled ? darkTheme : lightTheme

  return (
    <StyledLayoutWrapper id="layout-wrapper" data-useCookieBar={useCookieBar}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {isIntroDone ? (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
              rel="stylesheet"
            ></link>
            <Header />
            <main id="main-content">{children}</main>
            {/* <Footer /> */}
          </>
        ) : (
          <SplashScreen />
        )}
        {useCookieBar && <CookieBar />}
      </ThemeProvider>
    </StyledLayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
