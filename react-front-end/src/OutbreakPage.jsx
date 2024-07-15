import React from "react";
import Axios from "axios";
import { alpha } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppBar";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chatbot from "./components/Chatbot";
import TripAdvisor from "./components/TripAdvisor";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import Chart from "./components/Chart";
import FrequencyGraph from "./components/FrequencyGraph";
import Helplines from "./components/Helplines";

function Outbreak({ country, setCountryFunction }) {
  const [mode, setMode] = React.useState("light");
  const [countryOutbreaks, setCountryOutbreaks] = React.useState([]);
  const [latestOutbreak, setLatestOutbreak] = React.useState([]);
  const [symptoms, setSymptoms] = React.useState([]);
  const [flightAdvice, setFlightAdvice] = React.useState("");
  const [predicted, setPredicted] = React.useState("");
  const defaultTheme = createTheme({ palette: { mode } });
  const [rows, setRows] = React.useState([]);
  const [showButton, setShowButton] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);
  const [isLoading, setIsLoading] = React.useState(true);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    retrieveOutbreak();
    retrievePrediction();
    retrieveLatestOutbreak();
    retrieveSymptoms();
    buttonReveal();
  }, [country]);

  const buttonReveal = async () => {
    if (country === "Australia") {
      setShowButton(true);
    }
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  const retrieveSymptoms = async () => {
    try {
      // Post Request
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/CountrySymptom?Country=${country}`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      setSymptoms(response.data);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const retrieveDiseaseSymptoms = async (disease, year) => {
    try {
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/findDiseaseSymptoms?Disease=${disease}&minYear=${year}&maxYear=${year}`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      return response.data;
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const retrieveLatestOutbreak = async () => {
    try {
      // Post Request
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/LatestCountry?Country=${country}`;
      const response = await Axios.get(url);
      // Handle response {200}
      // console.log(response.data[0].attribute);
      setLatestOutbreak(response.data[0].attribute);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const retrieveOutbreak = async () => {
    try {
      // Post Request
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/countryLatestFive?Country=${country}`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      setCountryOutbreaks(response.data);
      calculateFlightAdvice(response.data);
      const newRows = [];
      for (const outbreak of response.data) {
        const dateString = outbreak.attribute["Date Reported"];
        const year = new Date(dateString).getFullYear();
        const symptoms = await retrieveDiseaseSymptoms(
          outbreak.attribute["Outbreak name"],
          year
        );
        const data = createData(
          outbreak.attribute["Outbreak name"],
          outbreak.attribute["Date Reported"],
          outbreak.attribute,
          symptoms
        );
        newRows.push(data);
      }
      setIsLoading(false);
      // response.data.forEach((outbreak) => {
      //   newRows.push(
      //     createData(
      //       outbreak.attribute["Outbreak name"],
      //       outbreak.attribute["Date Reported"],
      //       outbreak.attribute
      //     )
      //   );
      // });
      setRows(newRows);
      console.log(rows);
      console.log(countryOutbreaks);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const calculateFlightAdvice = (current_outbreaks) => {
    const outbreak = current_outbreaks[0];
    const dateString = outbreak.attribute["Date Reported"];
    const year = new Date(dateString).getFullYear();
    if (year === 2024) {
      setFlightAdvice(
        "We would not advise you to travel here for the time being."
      );
    } else if (year === 2023) {
      setFlightAdvice(
        "Now is a moderately safe time, please check out the disease data below."
      );
    } else {
      setFlightAdvice("Now is a safe time to travel here!");
    }
  };

  const retrievePrediction = async () => {
    try {
      // Post Request
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/Predictions?Country=${country}`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      if (response.data["Next Disease Date"] === "") {
        setPredicted("Prediction cannot be calculated.");
      } else {
        setPredicted(response.data["Next Disease Date"]);
      }
      console.log(predicted);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  // added
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  function createData(name, date, diseaseDict, symptoms) {
    return { name, date, diseaseDict, symptoms };
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        id="flights"
        sx={(theme) => ({
          width: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #CEE5FD, #FFF)"
              : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            direction="column"
            alignContent={"center"}
            sx={{ width: { xs: "100%", sm: "70%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "clamp(3.5rem, 10vw, 4rem)",
                gap: "10px",
              }}
            >
              Travelling to {country}!
              {showButton && (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  href="\focus"
                  sx={{ height: "35px", width: "160px", marginTop: "15px" }}
                >
                  Focus States
                </Button>
              )}
            </Typography>
            <Typography
              textAlign="center"
              color="text.primary"
              variant="h4"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
              {flightAdvice}
            </Typography>
            <Typography
              textAlign="center"
              color="text.primary"
              variant="h5"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
              Next Predicted Outbreak: {predicted}
            </Typography>
            <Typography
              textAlign="center"
              color="text.primary"
              variant="h6"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
              {country}'s Outbreak History:
            </Typography>
            <Typography
              textAlign="center"
              color="text.primary"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
              {isLoading && <CircularProgress />}
            </Typography>
            <Chart diseaseData={countryOutbreaks}></Chart>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 700, alignItems: "center" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Disease</StyledTableCell>
                    <StyledTableCell align="right">
                      Date Reported
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <>
                      {console.log(row.diseaseDict)}
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.date}
                          <ExpandMore
                            expand={expandedId === i}
                            onClick={() => handleExpandClick(i)}
                            aria-expanded={expandedId === i}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </ExpandMore>
                        </StyledTableCell>
                      </StyledTableRow>
                      <Collapse
                        in={expandedId === i}
                        timeout="auto"
                        unmountOnExit
                        sx={{
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CardContent sx={{ minWidth: 275, padding: 5 }}>
                          <Typography variant="h2" align="center" gutterBottom>
                            {row.name}
                          </Typography>

                          <Typography
                            variant="caption"
                            align="center"
                            display="block"
                            gutterBottom
                            style={{ padding: 2 }}
                          >
                            <span> Date Reported: {row.date} </span>
                            <span>
                              {" "}
                              Location: {row.diseaseDict["Location"]}{" "}
                            </span>
                          </Typography>

                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{ padding: 6 }}
                          >
                            Situation at a Glance
                          </Typography>
                          <Grid item xs={5} md={4}>
                            <Item>
                              <Typography
                                variant="body2"
                                align="left"
                                gutterBottom
                                style={{ padding: 6 }}
                              >
                                {row.diseaseDict["Situation at a Glance"]}
                              </Typography>
                            </Item>
                          </Grid>

                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{ padding: 6 }}
                          >
                            Symptoms
                          </Typography>
                          <Grid item xs={5} md={4}>
                            <Item>
                              <Typography
                                variant="body2"
                                align="left"
                                gutterBottom
                                style={{ padding: 6 }}
                              >
                                <ul>
                                  {row.symptoms.map((symptoms) => {
                                    return <li>{symptoms}</li>;
                                  })}
                                </ul>
                              </Typography>
                            </Item>
                          </Grid>

                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{ padding: 6 }}
                          >
                            Risk Assessment
                          </Typography>
                          <Grid item xs={5} md={4} align="left">
                            <Item>
                              <Typography
                                variant="body2"
                                align="left"
                                gutterBottom
                                style={{ padding: 6 }}
                              >
                                {row.diseaseDict["WHO Risk Assessment"]}
                              </Typography>
                            </Item>
                          </Grid>

                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{ padding: 6 }}
                          >
                            Public Health Response
                          </Typography>
                          <Grid item xs={5} md={4}>
                            <Item>
                              <Typography
                                variant="body2"
                                align="left"
                                gutterBottom
                                style={{ padding: 6 }}
                              >
                                {row.diseaseDict["Public Health Response"]}
                              </Typography>
                            </Item>
                          </Grid>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{ padding: 6 }}
                          >
                            WHO Advice
                          </Typography>
                          <Grid item xs={5} md={4}>
                            <Item>
                              <Typography
                                variant="body2"
                                align="left"
                                gutterBottom
                              >
                                {row.diseaseDict["WHO Advice"]}
                              </Typography>
                            </Item>
                          </Grid>
                        </CardContent>
                      </Collapse>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              textAlign="center"
              color="text.primary"
              variant="h5"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
             How does {country} compare?
            </Typography>
            <FrequencyGraph country={country}></FrequencyGraph>
            <Typography
              textAlign="center"
              color="text.primary"
              variant="h5"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
             Travel Tips for {country}
            </Typography>
            <Helplines country={country}></Helplines>
            <TripAdvisor country={country}></TripAdvisor>
          </Stack>
        </Container>
      </Box>
      <Chatbot />
    </ThemeProvider>
  );
}

export default Outbreak;
