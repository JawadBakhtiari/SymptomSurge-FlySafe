import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dropdown } from "semantic-ui-react";
import { countryOptions } from "./countries";
import { symptomsOptions } from "./symptomsDict";
import { alpha } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chatbot from "./Chatbot";



export default function FindSymptoms({ country, symptom, setCountryFunction, setSymptomFunction }) {



    const handleChange = (selectedOption) => {
        setCountryFunction(selectedOption.target.outerText);
    };

    // const retrieveOutbreak = () => {
    //     axios.get(`https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/SymptomChecker?Country=${country}&Symptom=${symptom}`)
    //     .then(res => {
    //         console.log(res.data)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }


    return(
        <>

        <Box
            id="hero"
            sx={(theme) => ({
                width: "100%",
                backgroundImage: theme.palette.mode === "light"
                    ? "#FFF"
                    : "#090E10",
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
                        Feeling sick after your travel ?
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
                    >
                        Enter your symptom and country of travel below:
                    </Typography>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignSelf="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
                    >
                        <>
                        {/* <Dropdown
                            placeholder="Select Your Symptom"
                            fluid
                            search
                            selection
                            options={symptomsOptions}
                            onChange={(e) => handleChangeSymptom(e)}
                            style={{ width: "300px", height: "40px" }} /> */}
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={symptomsOptions}
                            sx={{ width: '300px', height: '40px', padding:'0px', margin:'0px' }}
                            size='small'
                            onInputChange={(event, newInputValue) => {
                                setSymptomFunction(newInputValue);
                            }}
                            renderInput={(params) =>
                                <TextField {...params}
                                fluid
                                search
                                selection
                                placeholder="Select Your Symptom"
                                />}
                        />
                        <Dropdown
                            placeholder="Select Country"
                            fluid
                            search
                            selection
                            options={countryOptions}
                            onChange={handleChange}
                            style={{ width: "300px", height: "35px" }} />
                        </>
                        {/* link changed here */}
                        <Link href="/postTravel">
                            <Button variant="contained" color="primary" style={{ height: "40px", width: "100px" }}>
                                Search
                            </Button>
                        </Link>
                        {/* <Button variant="contained" color="primary" style={{ height: "40px", width: "100px" }} onClick={() => retrieveOutbreak()}>
                            Search
                        </Button> */}
                    </Stack>
                </Stack>
            </Container>
        </Box>
        <Chatbot />
        </>
    );
}