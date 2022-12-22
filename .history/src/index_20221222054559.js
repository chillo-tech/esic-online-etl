#! /usr/bin/env node
const axios = require("axios");
const fetch = require('node-fetch');

const {DIGIFORMA_API_URL, DIGIFORMA_HEADERS,QUERY_PROGRAMS, API_URL, HEADERS} = require('./data.js');

const saveProgram =  async (program) => {
  console.log({program});
  try {
    const response = await fetch(`${API_URL}/items/formations`, {
      method: 'post',
      body: JSON.stringify({
        libelle: program.name, 
        digiforma_id: program.id,
        contenu: program.description,
        cpf: program.cpf,
        cpf_code: program.cpfCode,
      
      }),
      headers: HEADERS
    });
    const {status} = await response;
    console.log(status, program.id)
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }

}
(async () => {
  try {
    const response = await axios.post(DIGIFORMA_API_URL, {query: QUERY_PROGRAMS}, { headers: DIGIFORMA_HEADERS });
    const programs = response.data.data.programs;
    programs.slice(0, 2).forEach(program => {
        saveProgram(program)
    })
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }
})();
