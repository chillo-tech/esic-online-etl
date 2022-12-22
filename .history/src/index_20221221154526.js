#! /usr/bin/env node
const axios = require("axios");
const QUERY_PROGRAMS = `
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

axios({
  url: 'https://1jzxrj179.lp.gql.zone/graphql',
  method: 'post',
  data: {
    query: QUERY_PROGRAMS
  },
  

}).then((result) => {
  console.log(result.data)
});
const fetchPrograms = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }
  axios.post(Helper.getUserAPI(), data, {
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
}
console.log("hofhezopfhzofzh^")