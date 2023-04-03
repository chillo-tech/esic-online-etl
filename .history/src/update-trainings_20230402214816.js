#! /usr/bin/env node
const axios = require("axios");
const fetch = require('node-fetch');

const {
  API_URL, 
  QUERY_PROGRAMS, 
  QUERY_PROGRAMS_BY_ID,
  QUERY_PROGRAMS_ID,
  QUERY_PROGRAMS_WITH_ALL_PARAMS,
  HEADERS, 
  DIGIFORMA_HEADERS, 
  DIGIFORMA_API_URL, 
  PROD_API_URL,
  PROGRAM_KEY_MAP,
  CATEGORY_KEY_MAP,
  delaiAccess
} = require('./data.js');
const {SOUS_CATEGORIES, CATEGORIES} = require('./souscategories.js');


const removeDuplicates = (obj) => {
  obj = obj.filter((value, index, self) => {
    const existingIndex = self.findIndex((t) => {
      return t.name.trim() === value.name.trim() && t.name.trim().length === value.name.trim().length
    })
    if (existingIndex !== index) {
      console.log(`[DUPLICATE] ${existingIndex} ${obj[existingIndex].name} ${index} ${obj[index].name}`)
    }
    return index === existingIndex;
  }
    
  );
  return obj
}

const mapObject = (object, keymap) => {
  const result = {};
  Object.keys(object).forEach(key =>  {
    const resultKey = keymap[key];
    if(key === "goals" || key === "prerequisites") {
      result[resultKey] = object[key].map(({text}) => `<p>${text.trim()}</p>`).join("");
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

const updateEsicTrainingWithDigiformaData = async (item) => {
  const data = {};
  data['delai'] = delaiAccess("2 Semaines");
  data['formateur'] = "Nos formations dont animées par des experts reconnus dans leur domaine possédant une expérience sur le terrain significative et des compétences pédagogiques reconnues.";
  data['accessibilite'] = "Les personnes atteintes de handicap souhaitant suivre cette formation sont invitées à nous contacter directement, afin d’étudier ensemble les possibilités de suivre la formation.";
  const prix = item.prix;
  const prixFormatte = prix.substring(0, prix.indexOf(',') > -1 ? prix.indexOf(','): prix.length).substring(0, prix.indexOf('€') > -1 ? prix.indexOf('€'): prix.length);
  data['prix'] = `À partir de ${prixFormatte} €`;; //`À partir de ${prixFormatte} €`;
  if(item["digiforma_id"]) {
    const query = QUERY_PROGRAMS_BY_ID(item["digiforma_id"]);
    const digiformaItemResponse = await axios.post(DIGIFORMA_API_URL, {query}, { headers: DIGIFORMA_HEADERS });

    if (digiformaItemResponse.data.data) {
      const digiformaItemData = digiformaItemResponse.data.data.program;
     
      if(digiformaItemData) {
        if(digiformaItemData.goals && digiformaItemData.goals.length) {
          const objectif = digiformaItemData.goals
                                            .filter(({text}) => text.trim().length > 0)
                                            .map(({text}) => `<li>${text.trim().replace("\n","").replace(/\d./,"").trim()}</li>`)
                                            .join('');
          data['objectifs'] =  `<ul>${objectif}</ul>`;
        }

        if(digiformaItemData.mentoring) {
          data['formateur'] =  digiformaItemData.mentoring;
        }

        if(digiformaItemData.handicappedAccessibility) {
          data['accessibilite'] =  digiformaItemData.handicappedAccessibility;
        }

        if(digiformaItemData.accessDelay) {
          const {accessDelay, accessDelayUnit} = digiformaItemData;
          const libelleDelai = `${accessDelay}${(accessDelayUnit === 'WEEKS' || accessDelayUnit === null) ? ' Semaines': ''} ${accessDelayUnit === 'HOURS' ? ' Heures': ''} ${accessDelayUnit === 'MONTHS' ? ' Mois': ''}`.trim();
          data['delai'] = delaiAccess(libelleDelai);
        }

        if(digiformaItemData.costs  && digiformaItemData.costs.length) {
            console.log(digiformaItemData.costs);
            /*
            const prerequis = digiformaItemData.costs
                                              .filter(({text}) => text.trim().length > 0)
                                              .map(({text}) => `<li>${text.trim().replace("\n","").replace(/\d./,"").trim()}</li>`)
                                              .join('');
      
            data['prerequis'] =  `<ul>${prerequis}</ul>`;
            */
        }

        if(digiformaItemData.costsInter && digiformaItemData.costsInter.length) {
          //console.log(digiformaItemData.costsInter);
          /*
          const prerequis = digiformaItemData.costs
                                            .filter(({text}) => text.trim().length > 0)
                                            .map(({text}) => `<li>${text.trim().replace("\n","").replace(/\d./,"").trim()}</li>`)
                                            .join('');

          data['prerequis'] =  `<ul>${prerequis}</ul>`;
          */
        }

        if(digiformaItemData.pedagogicalResources && digiformaItemData.pedagogicalResources.length) {
          const ressources = digiformaItemData.pedagogicalResources
                                            .filter(({text}) => text.trim().length > 0)
                                             .map(({text}) => `<li>${text.trim().replace("\n","").replace(/\d./,"").trim()}</li>`)
                                            .join('');
  
          data['ressources'] =  `<ul>${ressources}</ul>`;
        }

        if(digiformaItemData.assessments && digiformaItemData.assessments.length) {
          const assessments = digiformaItemData.assessments
                                            .filter(({text}) => text.trim().length > 0)
                                             .map(({text}) => `<li>${text.trim().replace("\n","").replace(/\d./,"").trim()}</li>`)
                                            .join('');
  
          data['evaluations'] =  `<ul>${assessments}</ul>`;
        }

        if(digiformaItemData.prerequisites  && digiformaItemData.prerequisites.length) {
          const prerequis = digiformaItemData.prerequisites
                                            .filter(({text}) => text.trim().length > 0)
                                            .map(({text}) => `<li>${text.trim().replace("\n","").replace(/\d./,"").trim()}</li>`)
                                            .join('');

          data['prerequis'] =  `<ul>${prerequis}</ul>`;
        }

        if(digiformaItemData.pedagogicalResources  && digiformaItemData.pedagogicalResources.length) {
          const items = digiformaItemData.pedagogicalResources
                                            .filter(({text}) => text.trim().length > 0)
                                            .map(({text}) => `<li>${text.trim().replace("\n","").replace(/\d./,"").trim()}</li>`)
                                            .join('');

          data['ressources'] =  `<ul>${items}</ul>`;
        }
        if(Object.keys(data).length) {
          const {status} = await axios.patch(`${PROD_API_URL}/formations/${item['id']}`, data, { headers: HEADERS });
          console.log({status, id: item['id']});
        }
  
      }
    }
  } else {  
    const {status} = await axios.patch(`${PROD_API_URL}/formations/${item['id']}`, data, { headers: HEADERS });
    console.log({status, id: item['id']});
  }
}
(async () => {
  try {
    const digiformaResponse = await axios.post(DIGIFORMA_API_URL, {query: QUERY_PROGRAMS_WITH_ALL_PARAMS}, { headers: DIGIFORMA_HEADERS });
    const digiformaPrograms = digiformaResponse.data.data.programs;
    const onSalePrograms = digiformaPrograms.filter(p => { return p.onSale === true});
    console.log({
      digiformaPrograms: digiformaPrograms.length,
      onSalePrograms: onSalePrograms.length
    });
    const digiformaProgramsToSave = removeDuplicates(onSalePrograms);
    const digiformaProgramsToSaveIds = digiformaProgramsToSave.map(item => item.id);


    const esicResponse = await axios.get(`${PROD_API_URL}/formations?fields=id,libelle,digiforma_id,prix&limit=1000`, { headers: HEADERS });
    const esicFormations = esicResponse.data.data;
    console.log({
      edigiformaPrograms: digiformaPrograms.length, 
      digiformaProgramsToSaveIds: digiformaProgramsToSaveIds.length, 
      esicFormations: esicFormations.length
    });

    const sortedDigiformaPrograms = digiformaProgramsToSave.sort((a, b) => {
      return ('' + a.name).localeCompare(b.name);
    });

    const sortedEsicFormations = esicFormations
      .filter(formation => {
        if(formation.digiforma_id === null) {
          /*
          console.log({
            id: formation.id, 
            name: formation.libelle, 
            digiforma_id: formation.digiforma_id
          });
          */
        }
        return formation;
      })
      .sort((a, b) => {
        return ('' + a.libelle).localeCompare(b.libelle);
      });

    const mergedItems = sortedDigiformaPrograms.map((entry, index) => {
      const esicEntry = sortedEsicFormations.filter(item => item["digiforma_id"] === entry["id"])[0];
      return {
        digiforma_id: entry["id"],
        digiforma_name: entry["name"],
        esic_id: esicEntry ? esicEntry["id"] : '',
        esic_name: esicEntry ? esicEntry["libelle"]: '',
        esic_digiforma_id: esicEntry ? esicEntry["digiforma_id"]: ''
      } 
    })
/*
    mergedItems.forEach(item => 
      console.log({  
        'digiforma_name':  item.digiforma_name,
        'digiforma_id': item.digiforma_id,
        'esic_digiforma_id': item.esic_digiforma_id,
        'esic_name':  item.esic_name,
        'esic_id':  item.esic_id
      })
    );
*/
    sortedEsicFormations.slice(0, 2).forEach((training)=> {
      
       updateEsicTrainingWithDigiformaData(training);
    })
    //console.log(digiformaProgramsToSave); 
    //console.log(esicFormations);
    //const esicProgramsToSave = removeDuplicates(esicPrograms);
    //const esicProgramsToSaveIds = digiformaProgramsToSave.map(item => item.id);
    
    
    //const queryFilter = programsToSaveIds.slice(1,10).map((id, index)=>`filter[_and][0][_and][0][digiforma_id][_in][${index + 1}]=${id}`).join('&');
    //const FILTER = `{ "digiforma_id": { "_in": ${programsToSaveIds.slice(1,2)} } }`;
    //const FILTER_BY_FIELD = `query { formation(filter: ${FILTER}) { id } }`;
    //const directusResponse = await axios.get(`${API_URL}/formations?${queryFilter}`, { headers: HEADERS });
    //const paginatedProgramsToSave = paginate(programsToSave, 200);
    var interval = 5000;
 
  } catch (ex) {
    console.error({ex});
    process.exit(1);
  }
})();
