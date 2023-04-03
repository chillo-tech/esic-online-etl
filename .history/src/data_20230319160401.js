const DIGIFORMA_API_URL= "https://app.digiforma.com/api/v1/graphiql";
const DIGIFORMA_API_TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYxMTUsIm1vZGUiOiJhcGkiLCJ0eXBlIjoidXNlciIsImV4cCI6MTk3NDMyNjQwMCwiaXNzIjoiRGlnaWZvcm1hIn0.OnkYrOvYD2r2vwlB6VJBxivs5c-2ZxqjCS61otuiinY";
const API_URL= "https://build.esic-online.chillo.fr/items";
const PROD_API_URL="https://build.esic-online.com/items"
const PROD_ACCES_TOKEN="7qPinYyvMPKxUOP2GNC-eeraImbWYF4J"
const delaiAccess = (text) => `
  <ul>
  <li>Le délai d'accès moyent pour cette formation est de ${text}</li>
  <li>Merci d’utiliser le formulaire de contact ou nous joindre par téléphone ou mail pour l’organisation de votre formation.</li>
  </ul>
`;
const DIGIFORMA_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${DIGIFORMA_API_TOKEN}`
}
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer 7qPinYyvMPKxUOP2GNC-eeraImbWYF4J'
}

const PROD_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer 7qPinYyvMPKxUOP2GNC-eeraImbWYF4J'
}
const PROGRAM_KEY_MAP = {
  "name":"libelle",
  "subtitle":"souslibelle",
  "description":"contenu",
  "goals":"objectifs",
  "prerequisites":"prerequis",
  "enrollingLevel":"niveau",
  "graduationTarget": "niveauDeCertification",
  "cpf":"cpf",
  "durationInHours":"heures",
  "cpfcode":"cpf_code",
  "durationInDays":"jours",
  "id":"digiforma_id",
  "dpc": "dpc",
  "rncpCode": "rncpCode",
  "rsCode": "rsCode"
}
const CATEGORY_KEY_MAP = {
  "name":"libelle",
  "id":"digiforma_id"
}

const QUERY_PROGRAMS_BY_ID = (id) => `
  query {
    program(id: ${id}) {
      accessDelay
      accessDelayUnit
      accountingAnalytics
      accountingNumber
      accountingNumberFundingAgency
      admissionModality
      capacity {
        active
        max
        min
      }
      category {
        color
        id
        name
        order
        name
      }
      certifInfoCode
      certificateurContratId
      certificateurId
      certificationDetails
      certificationIncludedInAdditionalExpenses
      certificationModality
      certifiedData
      clonedFrom
      code
      costs {
        cost
        costIndependant
        costIndividual
        costMode
        description
        id
        monthly
        type
        vat
      }
      costsInter{
        cost
        costIndependant
        costIndividual
        costMode
        description
        id
        monthly
        type
        vat
      }
      cpf
      cpfCode
      createdAt
      description
      diploma
      diplomaTitle
      documents {
        downloadable
        filename
        id
        mime
        size
        type
        url
        wistia {
          hashedId
          id
        }
      }
      dpc
      duration
      durationDays
      durationInDays
      durationInHours
      economicalModel
      enrollingLevel
      enrollingLevelEnforced
      entryExitModality
      goals {
        sourceId
        text
      }
      graduatedLevel
      graduationModality
      graduationTarget
      graduationValidityYears
      handicappedAccessibility
      hoursCenter
      hoursCompany
      id
      image {
        filename
        id
        mime
        size
        url
      }
      language
      mentoring
      name
      onSale
      overallGoal
      parentId
      pedagogicalResources {
        sourceId
        text
      }
      place
      placeRegulatoryCompliance
      prerequisites {
        sourceId
        text
      }
      publicRegistrationUrl
      rncpCode
      rsCode
      rythm
      satisfactionDescription
      showInstructors
      skillBlock
      specialty
      steps {
        sourceId
        text
        substeps {
          text
        }
      }
      subtitle
      tags 
        {
          description
          id
          name
        }
      targets {
        sourceId
        text
      }
      trainingModality
      trainingPedagogicalModality
      trainingType
      transmitterCertificationId
      version
      youtubeId
    }
  }
` 
const QUERY_PROGRAMS_ID = `
  query {
    programs {
      id
      name
    }
  }
` 
const QUERY_PROGRAMS_WITH_ALL_PARAMS = `
  query {
    programs {
      accessDelay
      accessDelayUnit
      accountingAnalytics
      accountingNumber
      accountingNumberFundingAgency
      admissionModality
      capacity {
        active
        max
        min
      }
      category {
        color
        id
        name
        order
        name
      }
      certifInfoCode
      certificateurContratId
      certificateurId
      certificationDetails
      certificationIncludedInAdditionalExpenses
      certificationModality
      certifiedData
      clonedFrom
      code
      costs {
        cost
        costIndependant
        costIndividual
        costMode
        description
        id
        monthly
        type
        vat
      }
      costsInter{
        cost
        costIndependant
        costIndividual
        costMode
        description
        id
        monthly
        type
        vat
      }
      cpf
      cpfCode
      createdAt
      description
      diploma
      diplomaTitle
      documents {
        downloadable
        filename
        id
        mime
        size
        type
        url
        wistia {
          hashedId
          id
        }
      }
      dpc
      duration
      durationDays
      durationInDays
      durationInHours
      economicalModel
      enrollingLevel
      enrollingLevelEnforced
      entryExitModality
      goals {
        sourceId
        text
      }
      graduatedLevel
      graduationModality
      graduationTarget
      graduationValidityYears
      handicappedAccessibility
      hoursCenter
      hoursCompany
      id
      image {
        filename
        id
        mime
        size
        url
      }
      language
      mentoring
      name
      onSale
      overallGoal
      parentId
      pedagogicalResources {
        sourceId
        text
      }
      place
      placeRegulatoryCompliance
      prerequisites {
        sourceId
        text
      }
      publicRegistrationUrl
      rncpCode
      rsCode
      rythm
      satisfactionDescription
      showInstructors
      skillBlock
      specialty
      steps {
        sourceId
        text
        substeps {
          text
        }
      }
      subtitle
      tags 
        {
          description
          id
          name
        }
      targets {
        sourceId
        text
      }
      trainingModality
      trainingPedagogicalModality
      trainingType
      transmitterCertificationId
      version
      youtubeId
    }
  }
`

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

module.exports = {
  API_URL, 
  delaiAccess,
  QUERY_PROGRAMS_BY_ID,
  QUERY_PROGRAMS_ID,
  QUERY_PROGRAMS_WITH_ALL_PARAMS,
  QUERY_PROGRAMS, 
  HEADERS, 
  PROD_API_URL,
  PROD_ACCES_TOKEN,
  PROD_HEADERS,
  DIGIFORMA_HEADERS, 
  DIGIFORMA_API_URL, 
  DIGIFORMA_API_TOKEN,
  PROGRAM_KEY_MAP,
  CATEGORY_KEY_MAP
}