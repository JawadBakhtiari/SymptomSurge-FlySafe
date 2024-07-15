import * as React from "react";
import Axios from "axios";
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { getHelpLines } from "../Helpers";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Helplines(country) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [ambulance, setAmbulance] = React.useState('');
  const [fire, setFire] = React.useState('');
  const [police, setPolice] = React.useState('');

  useEffect(() => {
    retrieveHelplines();
  }, [country.country]);

  const retrieveHelplines = () => {
    const helplines = getHelpLines(country.country);
    setAmbulance(helplines.ambulance ? helplines.ambulance : 'Not available');
    setFire(helplines.fire ? helplines.fire : helplines.ambulance ? helplines.ambulance : 'Not available');
    setPolice(helplines.police ? helplines.police : helplines.ambulance ? helplines.ambulance : 'Not available');
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Helplines:
        </Typography>
        <Demo>
          <List dense={dense}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalHospitalIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Ambulance"
                secondary={ambulance}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalFireDepartmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Fire"
                secondary={fire}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalPoliceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Police"
                secondary={police}
              />
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );

}