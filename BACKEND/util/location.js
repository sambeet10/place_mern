const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = process.env.GEO_API_KEY; // Your Geoapify API key

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.features.length === 0) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.features[0].geometry.coordinates;

  // Assuming Geoapify returns [longitude, latitude] format
  return {
    lat: coordinates[1],
    lng: coordinates[0],
  };
}

module.exports = getCoordsForAddress;
