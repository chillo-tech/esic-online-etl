#! /usr/bin/env node
import axios from "axios";
import fetch from 'node-fetch';

import {DIGIFORMA_API_URL, DIGIFORMA_HEADERS,QUERY_PROGRAMS, API_URL, HEADERS} from './data.js');

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
    const response = await fetch(`https://admin.esic-online.chillo.fr/items/formations`, {
      method: 'post',
      body: JSON.stringify(program),
      headers: HEADERS
    });
    const data = await response.json();
    console.log('====================================');
    console.log(data);
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
