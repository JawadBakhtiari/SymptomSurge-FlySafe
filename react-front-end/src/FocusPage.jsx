import React from "react";
import Axios from "axios";
import { alpha } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppBar";
import { useEffect } from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Outbreak from './OutbreakPage.jsx';


export default function Focus({ country, setCountryFunction }) {
  const [mode, setMode] = React.useState("light");
  const [countryOutbreaks, setCountryOutbreaks] = React.useState([]);
  const defaultTheme = createTheme({ palette: { mode } });
  const [rows, setRows] = React.useState([]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // const handleClick = () => {
  //   Outbreak(country, setCountryFunction);
  // };

  useEffect(() => {
    retrieveOutbreak();
  }, []);

  const retrieveOutbreak = async () => {
    try {
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/countryFocus`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      const newRows = [];
      response.data.forEach(outbreak => {
          newRows.push(createData(outbreak.attribute['state'], outbreak.attribute['safe']));
      });
      setRows(newRows);
      console.log(rows);
      console.log(countryOutbreaks);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  function createData(name, date) {
    return { name, date };
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
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
          <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                fontSize: "clamp(3.5rem, 10vw, 4rem)",
              }}
            >
            <IconButton aria-label="go back" href="\outbreak" size="large">
              <ArrowBackIcon fontSize="inherit"/>
            </IconButton>
              {country} Details!
            </Typography>
            <Typography
              textAlign="center"
              color="text.primary"
              variant="h4"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
              State of the States
            </Typography>
            <Typography
              textAlign="center"
              color="text.primary"
              variant="h6"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
            >
              States
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>State</StyledTableCell>
                    <StyledTableCell align="right">Safety</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.date}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

// export default Outbreak;
