import React from "react";
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
import Alert from '@mui/material/Alert';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";


function PostTravelSymptom({ country, symptom  }) {
    const [mode, setMode] = React.useState("light");
    const [outBreaks, setOutbreaks] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [dataEmpty, setDataEmpty] = React.useState(false);




    const defaultTheme = createTheme({ palette: { mode } });
    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
      };
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
      }));


    useEffect(() => {
        retrieveOutbreak();
        console.log("yep")
    }, []);



    const retrieveOutbreak = async () => {
        axios.get(`https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/SymptomChecker?Country=${country}&Symptom=${symptom}`)
        .then(res => {
            console.log(res.data)
            setOutbreaks(res.data)
            res.data.length === 0 ? setDataEmpty(true) : setDataEmpty(false)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            // setOutbreaks()
        })
    }



    return(
        <>
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
                    Related outbreaks in {country}
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        <b>Your Symptom(s):</b> {symptom}
                        &nbsp; &nbsp;
                        <b>Selected Country:</b> {country}
                    </Typography>





                    { dataEmpty ?

                        <Typography variant="h5" gutterBottom align="center">
                        No recent outbreaks were found. However, if you're experiencing any symptoms or concerns, please consult with your doctor or healthcare professional for personalized advice and care.
                        </Typography>
                        :

                    
                        <>
                        <Alert variant="outlined" severity="error" align="center" sx={{marginTop:'5%'}}> Your health is important to us. If you're experiencing any symptoms or concerns, please consult with your doctor or healthcare professional for personalized advice and care.</Alert>
                        <Box sx={{ display: 'flex', justifyContent:'center', flexWrap: 'wrap', paddingTop:'5%', height:'100%'}}>
                            <TableContainer component={Paper} sx={{width:'900px'}}>
                                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{display:'flex', background:'black'}}>
                                            <TableCell  sx={{flex:'1',  color:'white'}} align="center">Outbreak</TableCell>
                                            <TableCell sx={{flex:'2',  color:'white'}} align="center">Symptoms</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {outBreaks.map((row) => (
                                            <TableRow sx={{display:'flex'}}>
                                                <TableCell  sx={{flex:'1', textAlign:'center', paddingLeft:'10%', paddingRight:'15%', paddingTop:'15%'}}  align="center">{row[0]}</TableCell>
                                                <TableCell  sx={{flex:'2'}}  align="left">
                                                    <ul >
                                                        {row[1].map((x) =>
                                                            <li>{x}</li>
                                                        )}
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                        </Box>
                        </>
                    }
                    {isLoading && <CircularProgress sx={{marginLeft:'45%'}} />}
                    <Link href="/">
                        <Button variant="contained" sx={{position: 'relative', left:'85%' ,padding:'1%', width:'15%', fontSize:'0.8em'}} >Go Back</Button>
                    </Link>
                </Stack>
                </Container>
            </Box>
            </ThemeProvider>

        </>
    );

}

export default PostTravelSymptom;


// branch : findOutbreak
// files changed: LandingPage.jsx FindSymptoms.jsx App.jsx PostTravelPage.jsx symptomsDict.jsx