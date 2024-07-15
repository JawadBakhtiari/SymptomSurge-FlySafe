import * as React from 'react';
import Axios from "axios";
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.jpeg';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


const style = {
  overflowY:"scroll",

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Outbreaks(country) {
  const [recentOutbreaks, setRecentOutbreaks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    retrieveRecentOutbreaks();
  }, [country]);

  const retrieveRecentOutbreaks = async () => {
    try {
      // Post Request
      const url = `https://q5n3v2ceb2.execute-api.ap-southeast-2.amazonaws.com/default/Report`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      setRecentOutbreaks(response.data);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const copyContent = (text) => {
   // Copy the text inside the text field
   navigator.clipboard.writeText(text);

   // Alert the copied text
   console.log("Copied the text: " + text);
  };

  return (
    <>
      <Container
        id="pricing"
        sx={{
          pt: { xs: 2, sm: 10 },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h2" variant="h3" color="text.primary">
          Recent Outbreaks:
        </Typography>
      </Container>
      <Container
        id="pricing"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2, sm: 4 },
        }}
      >
        {recentOutbreaks.map((disease, index) => {
          return (
            <div key={index}>
              <Card sx={{ width: 265, minHeight: 430 }}>
                <CardHeader
                  title={<Button onClick = {handleOpen} style={{fontSize: '15px' , variant:"h5", color:"black"}}>{disease.attribute["Outbreak name"]}</Button>}
                  subheader={disease.attribute["Date Reported"]}
                  sx={{ minHeight: 135 }}
                />
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <Typography variant="h2" align="center" gutterBottom>
                  {disease.attribute["Outbreak name"]}
                </Typography>

                <Typography
                  variant="caption"
                  align="center"
                  display="block"
                  gutterBottom
                  style={{ padding: 2 }}
                >
                  <span> Date Reported: {disease.attribute["Date Reported"]} </span>
                  <span>
                    {" "}
                    Location: {disease.attribute["Location"]}{" "}
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
                      {disease.attribute["Situation at a Glance"]}
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
                      {disease.attribute["WHO Risk Assessment"]}
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
                      {disease.attribute["Public Health Response"]}
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
                      {disease.attribute["WHO Advice"]}
                    </Typography>
                  </Item>
                </Grid>
                  </Box>
                </Modal>
                <CardMedia
                  component="img"
                  height="150"
                  image={index === 0 ? image1 : index === 1 ? image2 : index === 2 ? image3 : index === 3 ? image4 : null}
                  alt={`Image ${index + 1}`}
                />
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    {disease.attribute["Location"]}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="copy content" onClick={() => copyContent(disease.attribute["Outbreak name"])}>
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton aria-label="share" onClick={() => copyContent("https://symptom-surge-frontend.vercel.app")}>
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          )
        })}
      </Container>
    </>
  );
}