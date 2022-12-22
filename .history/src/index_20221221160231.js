#! /usr/bin/env node
const axios = require("axios");
const API_URL= "https://admin.esic-online.chillo.fr/items";
const QUERY_PROGRAMS = () => `
query {
  programs {
    id
    name
    subtitle
    accessDelay
    cpf
    cpfCode
    description
    category {
      id
    	name
      
  	}
  }
}
`
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
  console.log("djafoezoh")
})();
