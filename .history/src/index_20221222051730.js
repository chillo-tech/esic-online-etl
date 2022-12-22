#! /usr/bin/env node
const axios = require("axios");
const fetch = require('node-fetch');

const {DIGIFORMA_API_URL, DIGIFORMA_HEADERS,QUERY_PROGRAMS, API_URL, HEADERS} = require('./data.js');

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
const saveProgram =  async (program) => {
  console.log({program});
  try {
    const response = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'});
    const data = await response.json();

console.log(data);
    const response = await axios.post(`https://admin.esic-online.chillo.fr/items/formations`, {libelle: program.name}, { headers: HEADERS });
   console.log('====================================');
   console.log(response);
   console.log('====================================');
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }

}
(async () => {
  try {
    const response = await axios.post(DIGIFORMA_API_URL, {query: QUERY_PROGRAMS}, { headers: DIGIFORMA_HEADERS });
    const programs = response.data.data.programs;
    programs.slice(2).forEach(program => {
        saveProgram(program)
    })
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }
})();
