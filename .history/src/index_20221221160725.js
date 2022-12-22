#! /usr/bin/env node
const axios = require("axios");
const {QUERY_PROGRAMS, API_URL, HEADERS} = require('./data.js');

/*
(() => {
  console.log('====================================');
  console.log("dddd");
  console.log('====================================');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer lK7DlJvWeIMK6Yac9C3XsFfYVMcKiLYX'
  }
  axios.post(API_URL, QUERY_PROGRAMS, {
    headers: headers
  })
  .then((response) => {
    dispatch({
      type: FOUND_USER,
      data: response.data[0]
    })
  })
  .catch((error) => {
    dispatch({
      type: ERROR_FINDING_USER
    })
  })
})();
*/
(async () => {
  console.log({QUERY_PROGRAMS, API_URL, HEADERS})
  try {
    const response = axios.post(API_URL, QUERY_PROGRAMS, { headers: HEADERS });
    console.log(JSON.stringify(response));
  } catch (ex) {
    console.error({ status: ex.status, method: ex.request.method, url: ex.request.url });
    process.exit(1);
  }
})();
