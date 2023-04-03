#! /usr/bin/env node
const axios = require("axios");
const fetch = require('node-fetch');

const {
  API_URL, 
  QUERY_PROGRAMS, 
  QUERY_PROGRAMS_WITH_ALL_PARAMS,
  HEADERS, 
  DIGIFORMA_HEADERS, 
  DIGIFORMA_API_URL, 
  PROGRAM_KEY_MAP,
  CATEGORY_KEY_MAP
} = require('./data.js');
const {SOUS_CATEGORIES, CATEGORIES} = require('./souscategories.js');


const removeDuplicates = (obj) => {
  obj = obj.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.name.trim() === value.name.trim() && t.name.trim().length === value.name.trim().length
    ))
  );
  return obj
}

const mapObject = (object, keymap) => {
  const result = {};
  Object.keys(object).forEach(key =>  {
    const resultKey = keymap[key];
    if(key === "goals" || key === "prerequisites") {
      result[resultKey] = object[key].map(({text}) => `<p>${text}</p>`).join("");
    } else if(key === "enrollingLevel") {
      result["niveau"] = "BEGINNER"
    } else {
      result[resultKey] = object[key];
    }
  })
  return Object.fromEntries(Object.entries(result).filter(([_, v]) => v != null));
}

const save =  async (object, endpoint, index) => {
  try {
    delete object["undefined"];
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'post',
      body: JSON.stringify({...object, status: "published", niveau: "BEGINNER"}),
      headers: HEADERS
    });
    const {status} = await response;
    if (status!=200) {
      
      console.log(object)
    }
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
    const response = await axios.post(DIGIFORMA_API_URL, {query: QUERY_PROGRAMS_WITH_ALL_PARAMS}, { headers: DIGIFORMA_HEADERS });
    const programs = response.data.data.programs;
    const programsToSave = removeDuplicates(programs);
    const paginatedProgramsToSave = paginate(programsToSave, 200);
    var interval = 5000;

    CATEGORIES.forEach((category, index) => {
      save(category, "categories",`${index}`)
    })

    // categories
/*
    const categories = programsToSave.filter(n => n.category != null).map(program => program.category);
    removeDuplicates(categories).forEach((category, index) => {
      const mapped = mapObject(category, CATEGORY_KEY_MAP);
      save(mapped, "souscategories",`${index}`)
    })
    // Programmes
    paginatedProgramsToSave.forEach((group, index) => {
      setTimeout(function () {
        group.forEach((item, groupIndex) => {
          const mapped = mapObject(item,PROGRAM_KEY_MAP);
          save(mapped, "formations",`${index}-${groupIndex}`)
        })
      }, interval * index);
  })
  */
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }
})();
