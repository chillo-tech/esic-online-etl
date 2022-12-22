const DIGIFORMA_API_URL= "https://app.digiforma.com/api/v1/graphiql";
const DIGIFORMA_API_TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYxMTUsIm1vZGUiOiJhcGkiLCJ0eXBlIjoidXNlciIsImV4cCI6MTk3NDMyNjQwMCwiaXNzIjoiRGlnaWZvcm1hIn0.OnkYrOvYD2r2vwlB6VJBxivs5c-2ZxqjCS61otuiinY";
const API_URL= "https://admin.esic-online.chillo.fr/items";
const DIGIFORMA_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${DIGIFORMA_API_TOKEN}`
}
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer lK7DlJvWeIMK6Yac9C3XsFfYVMcKiLYX'
}
const QUERY_PROGRAMS = `
query {
  programs {
    id
    name
    code
    subtitle
    accessDelay
    cpf
    cpfCode
    description
    diploma
    diplomaTitle
    documents {
      downloadable
      filename
      url
    }
    dpc
    durationInDays
    durationInHours
    enrollingLevel
    graduationTarget
    goals {
      sourceId 
      text
    }
    image {filename url id}
    prerequisites {text}
    rncpCode
    rsCode
    category {
      id
    	name
      
  	}
  }
}
`

module.exports = {API_URL, QUERY_PROGRAMS, HEADERS, DIGIFORMA_HEADERS, DIGIFORMA_API_URL, DIGIFORMA_API_TOKEN}