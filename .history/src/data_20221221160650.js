const API_URL= "https://admin.esic-online.chillo.fr/items";
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer lK7DlJvWeIMK6Yac9C3XsFfYVMcKiLYX'
}
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

module.exports = {API_URL, QUERY_PROGRAMS}