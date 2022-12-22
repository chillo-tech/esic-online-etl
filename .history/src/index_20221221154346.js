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
console.log("hofhezopfhzofzh^")