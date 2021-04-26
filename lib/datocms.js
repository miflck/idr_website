import { GraphQLClient } from "graphql-request";
export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`
    }
  });
  return client.request(query, variables);
}


export const EDITORIALTEXTE=` 
query Editorialtexte {
    allEditorials {
      forschungsfeld {
        titel
      }
      beitraege {
        text {
          value
        }
      }
      menschen {
        name
      }
      projekte {
        titel
      }
    }
  }
  `


  export const MENSCHEN=`
  query Menschen {
    allMenschens {
      name
      funktion {
        titel
      }
      portrait {
        title
        url
        filename
      }
      lebenslauf {
        value
      }
      email
      website
      projekte {
        titel
      }
      publikationsliste {
        url
        title
        filename
      }
    } 
  }`
  
  export const VERANSTALTUNGEN=`
  query Veranstaltungen {
    allVeranstaltungs {
      datum
      titel
      referentIn
      untertitel
      organisation
      beschreibung {
        value
      }
    }
  }
  `


  export const PROJEKTE=`
  query Projekte {
    allProjekts {
      titel
      forschungsfeld {
        titel
      }
      projektinhalte {
        ... on EinzelbildRecord {
          einzelbild {
            alt
            filename
            title
            url
          }
        }
        ... on GalerieRecord {
          galerie {
            alt
            filename
            title
            url
          }
        }
        ... on PdfRecord {
          titel
          pdf {
            url
            title
          }
        }
        ... on TextRecord {
          id
          text {
            value
          }
        }
      }
      zeitraum {
        ... on StartdatumRecord {
          id
          startdatum
        }
        ... on EnddatumRecord {
          id
          enddatum
        }
      }
      leitung {
        name
      }
      verantwortung {
        name
      }
      mitarbeit {
        name
      }
      kooperationen {
        value
      }
      finanzierung {
        value
      } 
    }
  }
  `

  export const PUBLIKATIONEN=`
  query MyQuery {
    allPublikationens {
      titel
      bild {
        filename
        alt
        title
        url
      }
      publikationsart {
        titel
      }
      mitarbeit {
        name
      }
      link {
        value
      }
      pdf {
        title
        url
        filename
      }
      angaben {
        value
      }
      text {
        value
      }
    }
  }  
  `