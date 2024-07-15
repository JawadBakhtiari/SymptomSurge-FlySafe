import * as React from "react";
import Axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function TripAdvisor(country) {
  const [countryData, setCountryData] = React.useState([]);
  const [countryPhoto, setCountryPhoto] = React.useState("");
  const key = "A5E4954DC20146869AD733A7B08208EC";

  useEffect(() => {
    retrieveLocationId();
  }, [country]);

  const retrieveLocationId = async () => {
    try {
      // Post Request
      const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${key}&searchQuery=${country.country}&language=en'`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data.data[0].location_id);
      retrieveDescription(response.data.data[0].location_id);
      retrievePhoto(response.data.data[0].location_id);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };
  const retrieveDescription = async (locationID) => {
    try {
      // Post Request
      console.log(locationID);
      const url = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/details?key=${key}&language=en`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data);
      setCountryData(response.data);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  const retrievePhoto = async (locationID) => {
    try {
      // Post Request
      const url = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/photos?key=${key}&language=en`;
      const response = await Axios.get(url);
      // Handle response {200}
      console.log(response.data.data[0].images.large.url);
      setCountryPhoto(response.data.data[0].images.large.url);
    } catch (err) {
      // Handle error
      console.log(err);
    }
  };

  return (
    <>
      <img src={countryPhoto}></img>
      <Typography variant="body1" color="text.secondary">
        {countryData.description}
      </Typography>
      <Typography
        variant="body1"
        component={Link}
        to={countryData.web_url}
        sx={{ color: "blue" }}
      >
        Check out our partners over at Trip Advisor!
      </Typography>
    </>
  );
}
