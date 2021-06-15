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
    allEditorials (locale:$locale, orderBy: createdAt_ASC) {
      id
      forschungsfeld {
        titel
        id
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
      projekte {
        titel
        id
        slug
      }
    }
  }
  `

  export const MENSCHEN=`
  query Menschen($locale: SiteLocale) {
    allMenschens (locale:$locale) {
      name
      id
      slug
      funktion {
        titel
      }
      forschungsfeld {
        titel
        id
      }
      portrait {
        title
        url
        filename
      }
      projekte {
        slug
        titel
      }
    } 
    allForschungsfelders(orderBy: reihenfolge_ASC) {
      titel
      reihenfolge
    }
  }
  `

  export const MENSCHEINZEL=`
  query MenschBySlug($slug: String!, $locale: SiteLocale) {
      menschen(locale:$locale, filter: {slug: {eq: $slug}}) {
      id
      name
      slug
      funktion {
        titel
        id
      }
      forschungsfeld {
        titel
        id
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
        id
      }
      publikationsliste {
        url
        title
        filename
      }
    } 
  }`


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

  export const PUBLIKATIONEN=`
  query MyQuery ($locale: SiteLocale) {
    allPublikationens (locale:$locale) {
      titel
      id
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
  query PublikationBySlug ($slug: String!, $locale: SiteLocale) {
    publikationen (locale:$locale, filter: {slug: {eq: $slug}}) {
    id
    titel
    slug
    publikationsart {
      titel
      id
    }
    mitarbeit {
      name
      id
      slug
    }
    bild {
      alt
      url
      title
    }
    info {
      value
    }
    publikationsinhalte {
      ... on PdfRecord {
        _modelApiKey
        titel
        id
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
    news(filter: {id: {eq: "40042262"}}) {
      id
      links {
        ... on ProjektRecord {
          id
          slug
          titel
          _modelApiKey
        }
        ... on PublikationenRecord {
          id
          titel
          slug
          _modelApiKey
          bild {
            filename
            alt
            title
            url
          }
        }
        ... on VeranstaltungRecord {
          id
          titel
          slug
          _modelApiKey
          datum
        }
      }
    }
  }  
`  