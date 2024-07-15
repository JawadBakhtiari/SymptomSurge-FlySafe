import * as React from "react";
import Axios from "axios";
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import Typography from "@mui/material/Typography";
import { LineChart } from '@mui/x-charts/LineChart';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function FrequencyGraph(country) {
  const [mode, setMode] = React.useState("light");
  const [isResponsive, setIsResponsive] = React.useState(true);
  const [countryFrequency, setCountryFrequency] = React.useState([]);
  const defaultTheme = createTheme({ palette: { mode } });
  const [xAxis, setxAxis] = React.useState([]);
  const [abbreviatedXAxis, setAbbreviatedXAxis] = React.useState([]);
  const [yAxis, setyAxis] = React.useState([]);
  const [series, setSeries] = React.useState([]);
  const [ranking, setRanking] = React.useState('');

  const Container = isResponsive ? ResponsiveChartContainer : ChartContainer;
  const sizingProps = isResponsive ? {} : { width: 500, height: 300 };

  useEffect(() => {
    retrieveRecentOutbreaks();
  }, [country.country]);

  const retrieveRecentOutbreaks = async () => {
    try {
      // Post Request
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/FrequencyGraph?Country=${country.country}`;
      const response = await Axios.get(url);
      // Handle response {200}
      setCountryFrequency(response.data);
      processData(response.data);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const processData = async (countryFrequencyData) => {
    console.log(countryFrequencyData);
    setCountryFrequency(countryFrequencyData);
    countryFrequencyData.forEach(([ranking, [countryName, frequency]]) => {

      xAxis.push(countryName);
      abbreviatedXAxis.push(countryName.substring(0, 10));
      yAxis.push(frequency);
      series.push(frequency);
      if (countryName === country.country.toLowerCase()) {
        setRanking(ranking);
      }
    });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <Typography
        textAlign="center"
        color="text.primary"
        variant="h6"
        marginLeft="100"
        sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
      >
        Currently Ranked at: {ranking}
      </Typography>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', height: 300 }} elevation={3}>
        <LineChart
          series={[
            {
              type: 'line',
              data: series,
              label: "Number of Disease Outbreaks",
            },
          ]}
          yAxis={[
            {
              data: yAxis,
              scaleType: 'band',
              id: 'y-axis-id'
            }
          ]}
          xAxis={[
            {
              data: abbreviatedXAxis,
              scaleType: 'band',
              id: 'x-axis-id',
            },
          ]}
          {...sizingProps}
        />

      </Paper>
    </Box>
    </ThemeProvider>
  );
}
