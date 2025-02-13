import * as React from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Dropdown } from "semantic-ui-react";
import { countryOptions } from "./countries";
import Alert from "@mui/material/Alert";

import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import logo from "../assets/logo.png";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="https://app.swaggerhub.com/apis/jacquelinie/SymptomSurge/2.0.0#/">
        Fit Flyer&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const [subscribeCountry, setSubscribeCountry] = React.useState("");
  const [message, setMessage] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [email, setEmail] = React.useState("");

  const handleChange = async (selectedOption) => {
    setSubscribeCountry(selectedOption.target.outerText);
  };

  const handleSubmit = async () => {
    try {
      // const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/disease_frequency_calculator?Country=${subscribeCountry}`; // Jai URL
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/SendEmail?Country=${subscribeCountry}&Email=${email}`;

      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      setMessage("Successfully Subscribed!");
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box sx={{ ml: "-15px" }}>
              <img src={logo} style={logoStyle} alt="logo of sitemark" />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Subscription Plans
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Subscribe to any of our plans to receive member only benefits.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autocomplete: "off",
                  ariaLabel: "Enter your email address",
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Dropdown
                placeholder="Select Country"
                fluid
                search
                selection
                options={countryOptions}
                onChange={handleChange}
                style={{ width: "350px", height: "40px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmit();
                  setOpen(true);
                  console.log(email);
                }}
                sx={{ flexShrink: 0 }}
              >
                Subscribe
              </Button>
            </Stack>
            <br></br>
            <Collapse in={open}>
              {message && (
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity="success"
                >
                  {message}
                </Alert>
              )}
            </Collapse>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Product
          </Typography>
          <Link color="text.secondary" href="#">
            Recent Outbreaks
          </Link>
          <Link color="text.secondary" href="#">
            Pricing
          </Link>
          <Link color="text.secondary" href="#">
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Company
          </Typography>
          <Link color="text.secondary" href="#">
            About us
          </Link>
          <Link color="text.secondary" href="#">
            Press
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Legal
          </Typography>
          <Link color="text.secondary" href="#">
            Terms
          </Link>
          <Link color="text.secondary" href="#">
            Privacy
          </Link>
          <Link color="text.secondary" href="#">
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: "center" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
