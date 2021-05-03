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
        slug
      }
      projekte {
        titel
        slug
      }
    }
  }
  `

  export const MENSCHEN=`
  query Menschen {
    allMenschens {
      name
      slug
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
        slug
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
    allProjekts(orderBy: enddatum_DESC) {
      slug
      titel
      forschungsfeld {
        titel
      }
      startdatum
      enddatum
    }
  }
  `

  export const PROJEKTEINZEL=`
  query ProjektBySlug($slug: String!) {
    projekt(filter: {slug: {eq: $slug}}) {
      slug
      titel
      leitung {
        name
        slug
      }
      verantwortung {
        name
        slug
      }
      mitarbeit {
        name
        slug
      }
      kooperationen {
        value
      }
      finanzierung {
        value
      }
      projektinhalte {
        ... on EinzelbildRecord {
          _modelApiKey
          einzelbild {
            alt
            filename
            title
            url
          }
        }
        ... on GalerieRecord {
          _modelApiKey
          galerie {
            alt
            filename
            title
            url
          }
        }
        ... on PdfRecord {
          _modelApiKey
          titel
          pdf {
            url
            title
          }
        }
        ... on TextRecord {
          _modelApiKey
          text {
            value
          }
        }
      }
    }
  }
  `

  export const PUBLIKATIONEN=`
  query MyQuery {
    allPublikationens {
      titel
      slug
      bild {
        filename
        alt
        title
        url
      }
      publikationsart {
        titel
      }
    }
  }  
  `

  export const PUBLIKATIONEINZEL=`
  query PublikationBySlug($slug: String!) {
    publikationen(filter: {slug: {eq: $slug}}) {
      titel
      slug
      publikationsart {
        titel
      }
      mitarbeit {
        name
      }
      bild {
        alt
        url
        title
      }
      publikationsinhalte {
        ... on PdfRecord {
          _modelApiKey
          titel
          pdf {
            url
            title
          }
        }
        ... on TextRecord {
          _modelApiKey
          text {
            value
          }
        }
      }
    }
  }
  `