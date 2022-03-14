import { GraphQLClient } from "graphql-request";
export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
  return client.request(query, variables);
}

export const ALLFORSCHUNGSFELDER = `
query AllForschungsfelder($locale: SiteLocale)
  allForschungsfelders (locale: $locale, orderBy: reihenfolge_ASC) {
    titel
    reihenfolge
    id
    colour {
      hex
      red
      green
      blue
    }
  }
}
`;

export const EDITORIALTEXTE = ` 
query Editorialtexte($locale: SiteLocale) {
  allEditorials(locale: $locale, orderBy: reihenfolge_ASC) {
    id
    reihenfolge
    forschungsfeld {
      reihenfolge
      titel
      id
      slug
      colour {
        hex
        red
        green
        blue
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
  allForschungsfelders (locale: $locale, orderBy: reihenfolge_ASC) {
    titel
    reihenfolge
    id
    colour {
      hex
      red
      green
      blue
    }
  }
  allProjekts (locale: $locale) {
    titel
    slug
    forschungsfeld {
      titel
      id
    }
  }
}
`;

export const EDITORIALINTRO = ` 
query Editorialintro ($locale: SiteLocale)  {
  editorialeinfHrungstext (locale: $locale){
    titel
    text {
      value
    }
  }
}
`;

export const ALLMENSCHEN = `
{
  allMenschens (first:500){
    id
    name
    slug
  }
}
`;

export const MENSCHEN = `
  query Menschen($locale: SiteLocale) {
    allMenschens(first:500, locale: $locale, orderBy: name_ASC) {
      name
      aktiv
      email
      extern
      slug
      id
      portrait {
        responsiveImage(imgixParams: {fit: crop,w: 300, h: 250, auto: format }) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
        title
        url
        filename
        focalPoint {
          x
          y
        }
      }

      funktion{
        ... on FunktionRecord {
          id
          titel
          colour {
            hex 
            red
            green
            blue           
          }
        }
      }

      forschungsfeld {
        ... on ForschungsfelderRecord {
          id
          titel
          colour {
            hex
            red
            green
            blue
          }
        }
        
      }
    }
    allForschungsfelders(locale: $locale, orderBy: reihenfolge_ASC) {
      titel
      reihenfolge
      id
      colour {
        hex
        red
        green
        blue
      }
    }



    allFunktions (locale: $locale) {
      titel
      id
      colour {
        hex
        red
        green
        blue
      }
    }
  }  
  `;

export const MENSCHEINZEL = `
  query MenschBySlug($slug: String!, $locale: SiteLocale) {
    allProjekts (locale: $locale) {
      titel
      slug
      mitarbeit {
        name
      }
    }
      menschen(filter: {slug: {eq: $slug}}) {
      id
      name
      slug
      forschungsfeld {
        ... on ForschungsfelderRecord {
          id
          titel
          colour {
            hex 
            red
            green
            blue           
          }
        }
        
      }

      funktion{
        ... on FunktionRecord {
          id
          titel
          colour {
            hex 
            red
            green
            blue           
          }

        }
      }
      
      portrait {
        title
        url
        filename
        responsiveImage(imgixParams: {fit: crop,w: 900, h:720, auto: format }) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
        focalPoint {
          x
          y
        }
      }
      email
      website
      bfhprofil
      
    }
  }
`;

export const ALLVERANSTALTUNGEN = `
{
  allVeranstaltungs {
    id
    titel
    slug
  }
}
`;

export const VERANSTALTUNGEN = `
  query Veranstaltungen ($locale: SiteLocale) {
    allVeranstaltungs (locale:$locale) {
      titel
      slug
      id
      datum
      referentIn
      text {
        value
      }
      beschreibung {
        value
      }
      forschungsfeld {
        titel
        id
        colour {
          hex
          red
          green
          blue
        }
      }
    }
    allForschungsfelders(locale: $locale, orderBy: reihenfolge_ASC) {
      titel
      reihenfolge
      colour {
        hex
        red
        green
        blue
      }
    }
  }
  `;

export const VERANSTALTUNGEINZEL = `
  query VeranstaltungBySlug ($slug: String!, $locale: SiteLocale) {
    veranstaltung (locale:$locale, filter: {slug: {eq: $slug}}) {
      titel
      id
      datum
      referentIn
      text {
        value
      }
      beschreibung {
        value
      }
      forschungsfeld {
        titel
        id
        colour {
          hex
          red
          green
          blue
        }
      }
    }
  }
  `;

export const PROJEKTE = `
  query Projekte ($locale: SiteLocale){
    allProjekts(first:100,locale:$locale, orderBy: enddatum_DESC) {
      titel
    id
    slug
    forschungsfeld {
      titel
      id
      colour {
        hex
        red
        green
        blue
      }
    }
    startdatum
    enddatum
   
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
  allForschungsfelders(locale: $locale, orderBy: reihenfolge_ASC) {
    titel
    reihenfolge
    id
    colour {
      hex
      red
      green
      blue
    }
  }
}
  `;

export const ALLPROJEKTE = `
    {

      allProjekts (first:500){
        id
        titel
        slug
        _status
        _firstPublishedAt
      }
      _allProjektsMeta {
        count
      }
    }
  `;

export const PROJEKTEINZEL = `
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
        extern
        aktiv
      }
      finanzierung {
        id
        title
      }
      kooperationen {
        id
        title
      }
      forschungsfeld {
        titel
        slug
        id
        colour {
          hex
          red
          green
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

      serviceBlocks {
        ... on ServiceElementRecord {
          id
          title
          persons {
            name
            slug
            id
          }
          text {
            value
          }
          projects {
            id
            slug
            titel
          }
        }
      }

    }
  }
  `;

export const NEWS = `
  query NEWS ($locale: SiteLocale){
    newsseite(locale: $locale, filter: {id: {eq: "40042262"}}) {
      id
      links {
        ... on ProjektRecord {
          id
          slug
          titel
          newstext {
            value
          }
          forschungsfeld {
            titel
            id
            colour {
              hex
              red
              green
              blue
            }
          }
          _modelApiKey
        }
        ... on VeranstaltungRecord {
          id
          titel
          slug
          _modelApiKey
          datum
          referentIn
          forschungsfeld {
            titel
            id
            colour {
              hex
              red
              green
              blue
            }
          }
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
          forschungsfeld {
            titel
            id
            colour {
              hex
              red
              green
              blue
            }
          }
        }
      }
    }
    allForschungsfelders(locale: $locale, orderBy: reihenfolge_ASC) {
      titel
      reihenfolge
      colour {
        hex
        red
        green
        blue
      }
    }
  }    
`;

export const ALLNEWS = ` 
query ALLNEWS ($locale: SiteLocale){
  allNews(locale: $locale,orderBy: _createdAt_ASC) {
      id
      title
      image {
        id
        url
        alt
        title
      }
      text {
        value
      }

      weblink
      internerLink {
        slug
        titel
        id
        _modelApiKey
      }
      
      forschungsfeld {
        id
        reihenfolge
        slug
        titel
        colour {
          hex
        }
      }
    }

    allForschungsfelders(locale: $locale, orderBy: reihenfolge_ASC) {
      titel
      reihenfolge
      id
      colour {
        hex
        red
        green
        blue
      }
    }
  }
`;

export const IMPRESSUM = ` 
query Impressum {
  impressum {
    impressumsblock {
      titel
      text {
        value
      }
    }
  }
}
`;
