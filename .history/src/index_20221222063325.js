#! /usr/bin/env node
const axios = require("axios");
const fetch = require('node-fetch');

const {DIGIFORMA_API_URL, DIGIFORMA_HEADERS,QUERY_PROGRAMS, API_URL, HEADERS} = require('./data.js');
let savedProgram = [];
const removeDuplicates = (obj) => {
  obj = obj.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.name.trim() === value.name.trim() && t.name.trim().length === value.name.trim().length
    ))
  );
  return obj
}

const saveProgram =  async (program, index) => {
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
    console.log(index, program.id, program.name, status)
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }

}
function paginate (arr, size) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size)
    let page = acc[idx] || (acc[idx] = [])
    page.push(val)

    return acc
  }, [])
}


(async () => {
  try {
    const response = await axios.post(DIGIFORMA_API_URL, {query: QUERY_PROGRAMS}, { headers: DIGIFORMA_HEADERS });
    const programs = response.data.data.programs;
    const programsToSave = removeDuplicates(programs);
    console.log(`${programs.length} from digiforma`);
    console.log(`${programsToSave.length} to Save`);
    const paginatedProgramsToSave = paginate(programsToSave, 100);
    paginatedProgramsToSave.forEach((group, index) => {
        console.log(`Handle ${index} of ${paginatedProgramsToSave.length}`);
        group.forEach((item, groupIndex) => {
          saveProgram(item, `${index}-${groupIndex}`)
        })
    })
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }
})();
