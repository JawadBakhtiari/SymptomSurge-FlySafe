import * as React from 'react';
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';

export default function BasicComposition(diseaseData) {
  const [isResponsive, setIsResponsive] = React.useState(true);
  var [xAxis, setxAxis] = React.useState([]);
  var [xAxisCopy, setxAxisCopy] = React.useState([]);
  var [years, setYears] = React.useState([]);
  var [series, setSeries] = React.useState([]);
  var [seriesCopy, setSeriesCopy] = React.useState([]);

  const Container = isResponsive ? ResponsiveChartContainer : ChartContainer;
  const sizingProps = isResponsive ? {} : { width: 500, height: 300 };

  useEffect(() => {
    processData();
  }, [diseaseData]);

  const processData = async () => {

    // Extract years from the data and populate xAxis and series
    if (xAxis.length !== 0) {
      const sortedSeries = [];
      console.log(xAxis);
      console.log(xAxisCopy);
      console.log(series);
      xAxis.forEach((year) => {
        const index = xAxisCopy.indexOf(year);
        sortedSeries.push(seriesCopy[index]);
      });
      series = sortedSeries;
      setxAxis(xAxis);
      setSeries(series);
      console.log(series);
      console.log(sortedSeries);
    } else {
      diseaseData.diseaseData.forEach((outbreak) => {
        const dateString = outbreak.attribute["Date Reported"];
        const year = new Date(dateString).getFullYear();
        console.log(xAxis);
        // If the year exists in xAxis, increment the corresponding value in series
        const index = xAxis.indexOf(year);
        console.log(index);
        if (index !== -1) {
          series[index]++;
        } else {
          // If the year doesn't exist, add it to xAxis and set the corresponding value in series to 1
          xAxis.push(year);
          xAxisCopy.push(year);
          series.push(1);
          seriesCopy.push(1);

        }
      });

      console.log(xAxis); // Check if the xAxis is properly filled with missing years and sorted
      console.log(series); // Check if the series data is properly updated

      // Fill in missing years between the minimum and maximum years in the data
      const minYear = Math.min(...xAxis);
      const maxYear = Math.max(...xAxis);
      for (let year = minYear + 1; year < maxYear; year++) {
        if (!xAxis.includes(year)) {
          const index = xAxis.findIndex((val) => val > year);
          xAxis.splice(index, 0, year);
          xAxisCopy.splice(index, 0, year);
          series.splice(index, 0, 0); // Insert 0 for missing years
          seriesCopy.splice(index, 0, 0);
        }
      }
      console.log(xAxis); // Check if the xAxis is properly filled with missing years and sorted
      console.log(series); // Check if the series data is properly updated

      // Sort xAxis array and rearrange corresponding elements in series array
      xAxis.sort((a, b) => a - b);
    }
    console.log(xAxis); // Check if the xAxis is properly filled with missing years and sorted
    console.log(series); // Check if the series data is properly updated
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', height: 300 }} elevation={3}>
        <Container
          series={[
            {
              type: 'line',
              data: series
            },
          ]}
          xAxis={[
            {
              data: xAxis,
              scaleType: 'band',
              id: 'x-axis-id',
            },
          ]}
          {...sizingProps}
        >
          <BarPlot />
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis label="Year" position="bottom" axisId="x-axis-id" />
        </Container>
      </Paper>
    </Box>
  );
}