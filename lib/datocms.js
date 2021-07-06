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
query Editorialtexte($locale: SiteLocale) {
  allEditorials(locale: $locale, orderBy: createdAt_ASC) {
    id
    forschungsfeld {
      titel
      id
      slug
      colour {
        hex
      }
    }
    beitraege {
      id
      text {
        value
      }
    }
    menschen {
      id
      name
      slug
    }
  }
  allForschungsfelders{
    titel
    colour {
      hex
    }
  }
  allProjekts {
    titel
    slug
    forschungsfeld {
      titel
      id
    }
  }
}
`

  export const MENSCHEN=`
  query Menschen($locale: SiteLocale) {
    allMenschens(locale: $locale, orderBy: name_ASC) {
      name
      id
      slug
      portrait {
        title
        url
        filename
      }
      forschungsfeld {
        ... on ForschungsfelderRecord {
          id
          titel
          colour {
            red
            hex
            green
            alpha
            blue
          }
        }
        ... on FunktionRecord {
          id
          titel
        }
      }
    }
    allForschungsfelders(orderBy: reihenfolge_ASC) {
      titel
      reihenfolge
    }
    allFunktions {
      titel
      id
    }
  }  
  `

  export const MENSCHEINZEL=`
  query MenschBySlug($slug: String!, $locale: SiteLocale) {
    allProjekts {
      titel
      slug
      mitarbeit {
        name
      }
    }
      menschen(locale:$locale, filter: {slug: {eq: $slug}}) {
      id
      name
      slug
      forschungsfeld {
        ... on ForschungsfelderRecord {
          id
          titel
          colour {
            hex            
          }
        }
        ... on FunktionRecord {
          id
          titel
        }
      }
      portrait {
        title
        url
        filename
      }
      lebenslauf {
        text {
          value
        }
      }
      email
      website
      publikationsliste {
        titel
        pdf {
          url            
          title
        }
      }
    }
  }
`


  export const VERANSTALTUNGEN=`
  query Veranstaltungen ($locale: SiteLocale) {
    allVeranstaltungs (locale:$locale) {
      titel
      slug
      id
      datum
      referentIn
      untertitel
      organisation
      beschreibung {
        value
      }
      forschungsfeld {
        titel
        id
        colour {
          red
          hex
          green
          alpha
          blue
        }
      }
    }
    allForschungsfelders(orderBy: reihenfolge_ASC) {
      titel
      reihenfolge
    }
  }
  `

  export const VERANSTALTUNGEINZEL=`
  query VeranstaltungBySlug ($slug: String!, $locale: SiteLocale) {
    veranstaltung (locale:$locale, filter: {slug: {eq: $slug}}) {
      titel
      id
      datum
      referentIn
      untertitel
      organisation
      beschreibung {
        value
      }
      forschungsfeld {
        titel
        id
        colour {
          hex
        }
      }
    }
  }
  `

  export const PROJEKTE=`
  query Projekte ($locale: SiteLocale){
    allProjekts(locale:$locale, orderBy: enddatum_DESC) {
      titel
    id
    slug
    forschungsfeld {
      titel
      id
      colour {
        red
        hex
        green
        alpha
        blue
      }
    }
    startdatum
    enddatum
    finanzierung {
      value
    }
    kooperationen {
      value
    }
    leitung {
      name
      slug
    }
    mitarbeit {
      name
      slug
    }
    projektinhalte {
      ... on TextRecord {
        id
        text {
          value
        }
      }
    }
    verantwortung {
      name
      slug
    }
  }
  allForschungsfelders(orderBy: reihenfolge_ASC) {
    titel
    reihenfolge
    colour {
      red
      hex
      green
      alpha
      blue
    }
  }
}
  `


export const PROJEKTEINZEL=`
  query ProjektBySlug ($slug: String!, $locale: SiteLocale) {
    projekt (locale:$locale, filter: {slug: {eq: $slug}}) {
      id
      slug
      titel
      leitung {
        id
        name
        slug
      }
      verantwortung {
        id
        name
        slug
      }
      mitarbeit {
        id
        name
        slug
      }
      kooperationen {
        value
      }
      finanzierung {
        value
      }
      forschungsfeld {
        titel
        slug
        colour {
          red
          hex
          green
          alpha
          blue
        }
      }
      startdatum
      enddatum
      projektinhalte {
        ... on EinzelbildRecord {
          _modelApiKey
          id
          einzelbild {
            alt
            filename
            title
            url
          }
        }
        ... on GalerieRecord {
          _modelApiKey
          id
          galerie {
            alt
            filename
            title
            url
          }
        }
        ... on PdfRecord {
          _modelApiKey
          id
          titel
          pdf {
            url
            title
          }
        }
        ... on TextRecord {
          _modelApiKey
          id
          text {
            value
          }
        }
      }
    }
  }
  `

  export const NEWS = `
  query NEWS {
    newsseite(filter: {id: {eq: "40042262"}}) {
      id
      links {
        ... on ProjektRecord {
          id
          slug
          titel
          _modelApiKey
        }
        ... on VeranstaltungRecord {
          id
          titel
          slug
          _modelApiKey
          datum
        }
        ... on NewsRecord {
          _modelApiKey
          id
          titel
          text {
            value
          }
          image {
            title
            url
          }
          weblink
        }
      }
    }
  }    
`  