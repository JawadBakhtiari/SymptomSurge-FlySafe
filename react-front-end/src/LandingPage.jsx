import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
import FindSymptoms from "./components/FindSymptoms";
import LogoCollection from "./components/LogoCollection";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Outbreaks from "./components/Outbreaks";
import Chatbot from "./components/Chatbot";

export default function LandingPage({ country, setCountryFunction, symptom, setSymptomFunction}) {
  const [mode, setMode] = React.useState("light");
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero country={country} setCountryFunction={setCountryFunction} />
      <Divider />
      <FindSymptoms country symptom setCountryFunction={setCountryFunction} setSymptomFunction={setSymptomFunction}/>
      <Box sx={{ bgcolor: "background.default" }}>
        <Divider />
        <Outbreaks country={country}/>
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <LogoCollection />
        <Divider />
        <Footer />
        <Chatbot />
      </Box>
    </ThemeProvider>
  );
}
