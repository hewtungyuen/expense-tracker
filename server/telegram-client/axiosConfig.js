const axios = require("axios");
const dotenv = require("dotenv").config();

var endpoint;

if (process.env.ENV === "DEV") {
  endpoint = process.env.ENDPOINT_DEV;
} else {
  endpoint = process.env.ENDPOINT_PROD;
}

const api = axios.create({
  baseURL: endpoint,
});

module.exports = api;
