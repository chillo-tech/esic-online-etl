#! /usr/bin/env node
const axios = require("axios");
const fetch = require('node-fetch');

const {DIGIFORMA_API_URL, DIGIFORMA_HEADERS,QUERY_PROGRAMS, API_URL, HEADERS, PROGRAM_KEY_MAP} = require('./data.js');
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
  const mappedProgram = {};
  Object.keys(program).forEach(key =>  {
    const mappedProgramKey = PROGRAM_KEY_MAP[key];
    if(key === "goals") {
      program[key].map(function({text}){
        return `<p>${text}</p>`;
      }).join(",");
    } else {
      mappedProgram[mappedProgramKey] = program[key];
    }
  })
  try {
    const response = await fetch(`${API_URL}/formations`, {
      method: 'post',
      body: JSON.stringify(mappedProgram),
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
    const paginatedProgramsToSave = paginate(programsToSave, 200);
    var interval = 5000;
    paginatedProgramsToSave.forEach((group, index) => {
        console.log(`Handle ${index} of ${paginatedProgramsToSave.length}`);
        setTimeout(function () {
          group.forEach((item, groupIndex) => {
            saveProgram(item, `${index}-${groupIndex}`)
          })
        }, interval * index);
    })
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }
})();
