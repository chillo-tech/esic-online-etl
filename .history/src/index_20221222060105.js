#! /usr/bin/env node
const axios = require("axios");
const fetch = require('node-fetch');

const {DIGIFORMA_API_URL, DIGIFORMA_HEADERS,QUERY_PROGRAMS, API_URL, HEADERS} = require('./data.js');
let savedProgram = [];
const removeDuplicates = (object) => {
  obj.arr = obj.arr.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.name.trim() === value.name.trim() && t.name.trim().length === value.name.trim().length
  ))
)
}

const saveProgram =  async (program) => {
  try {
    const response = await fetch(`${API_URL}/formations`, {
      method: 'post',
      body: JSON.stringify({
        libelle: program.name, 
        digiforma_id: program.id,
        contenu: program.description,
        cpf: program.cpf,
        cpf_code: program.cpfCode,
        status: "published"
      
      }),
      headers: HEADERS
    });
    const {status} = await response;
    console.log(status, program.id, program.name)
    savedProgram = [...saveProgram, ]
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }

}
(async () => {
  try {
    const response = await axios.post(DIGIFORMA_API_URL, {query: QUERY_PROGRAMS}, { headers: DIGIFORMA_HEADERS });
    const programs = response.data.data.programs;
    console.log(`${programs.length} from  digiforma`);
    programs.slice(0, 100).forEach(program => {
        saveProgram(program)
    })
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }
})();
