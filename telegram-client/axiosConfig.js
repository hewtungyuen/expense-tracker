const axios = require("axios");
const dotenv = require("dotenv").config();

const api = axios.create({
  baseURL: process.env.ENDPOINT,
});

module.exports = api;
