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
query AllForschungsfelder($locale: SiteLocale){
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
    selectedColour {
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
      selectedColour {
        hex 
        red
        green
        blue           
      }
    }
   beitraege {
        ... on TextRecord {
          _modelApiKey
          id
          text {
            value
          }
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
    selectedColour {
      hex 
      red
      green
      blue           
    }
  }
  allProjekts (first:100, locale: $locale,orderBy: enddatum_DESC) {
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
  allMenschens (first:500,filter: {extern: {eq: "false"},aktiv: {eq: "true"}}){
    id
    name
    slug
  }
}
`;

export const MENSCHEN = `
  query Menschen($locale: SiteLocale) {
    allMenschens(first:500, locale: $locale, orderBy: nachname_ASC, filter: {extern: {eq: "false"}}) {
      name
      aktiv
      email
      extern
      slug
      id
      portrait {
        responsiveImage(imgixParams: {fit: crop,w: 300, h: 270, auto: format, crop:focalpoint  }) {
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

      portraitZoom {
        url
        responsiveImage(imgixParams: {fit: crop, w: 300, h: 270, auto: format, crop: focalpoint}) {
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
          selectedColour {
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
          selectedColour {
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
      selectedColour {
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
      selectedColour {
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
    allProjekts (first:500, locale: $locale,orderBy: enddatum_DESC) {
      titel
      slug
      mitarbeit {
        name
      }
      leitung{
        name
      }
      verantwortung{
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
          selectedColour {
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
          selectedColour {
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
        responsiveImage(imgixParams: {fit:fill,w: 550, h:950, auto: format }) {
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
  allVeranstaltungs (first:100){
    id
    titel
    slug
  }
}
`;

export const VERANSTALTUNGEN = `
  query Veranstaltungen ($locale: SiteLocale) {
    allVeranstaltungs (first:100, locale:$locale, orderBy: datum_DESC) {
      titel
      slug
      id
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
        selectedColour {
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
      id
      colour {
        hex
        red
        green
        blue
      }
      selectedColour {
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
      
      untertitel,
      modularcontent {
        ... on EinzelbildRecord {
          _modelApiKey
          id
          einzelbild {
            alt
            filename
            title
            url
            width
            height
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

      forschungsfeld {
        titel
        id
        colour {
          hex
          red
          green
          blue
        }
        selectedColour {
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
      selectedColour {
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
      extern
      aktiv
    }
    mitarbeit {
      name
      slug
      extern
      aktiv
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
    selectedColour {
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

      allProjekts (first:100){
   
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
        extern
        aktiv
        organisation {
          id
          title
        }
      }
      verantwortung {
        id
        name
        slug
        extern
        aktiv
        organisation {
          id
          title
        }
      }
      mitarbeit {
        id
        name
        slug
        extern
        aktiv
        organisation {
          id
          title
        }
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
        selectedColour {
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
            width
            height

          }
        }

        ... on VideoRecord {
          _modelApiKey
          id
          clip {
            url
            width
            thumbnailUrl
            provider
            height
            title
          }
          caption {
            value
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
      slug

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
            selectedColour {
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
            selectedColour {
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
            selectedColour {
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
      selectedColour {
        hex 
        red
        green
        blue           
      }
    }
  }    
`;

export const NEWSEINZELN = ` 
query NewsBySlug($slug: String!, $locale: SiteLocale) {
  news(locale: $locale, filter: {slug: {eq: $slug}}) {
    id
    slug
    title
    subtitle
    _modelApiKey
    teaser {
      value
    }
    weblink
 
    modularcontent {
      ... on EinzelbildRecord {
        _modelApiKey
        id
        einzelbild {
          alt
          filename
          title
          url
          width
          height
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
        id
        _modelApiKey
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
    forschungsfeld {
      titel
      id
      colour {
        hex
        red
        green
        blue
      }
      selectedColour {
        hex
        red
        green
        blue
      }
    }
  }
}`;

export const ALLNEWS = ` 
query ALLNEWS ($locale: SiteLocale){
  allNews(first:100,locale: $locale) {
      id
      title
      slug
      teaser {
        value
      }
      image {
        id
        url
        alt
        title
      }
      hochformat
      date
      weblink
      internerLink {
        ... on MenschenRecord {
          id
          slug
          _modelApiKey
        }
        ... on ProjektRecord {
          id
          slug
          titel
          _modelApiKey
        }
        ... on VeranstaltungRecord {
          id
          slug
          titel
          _modelApiKey
        }
      }
      
      forschungsfeld {
        id
        reihenfolge
        slug
        titel
        colour {
          hex
        }
        selectedColour {
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
      id
      colour {
        hex
        red
        green
        blue
      }
      selectedColour {
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
export const PODCAST = `
query Podcast($locale: SiteLocale) {
  podcast(locale: $locale) {
    id
    content(locale: de) {
      ... on EinzelbildRecord {
        _modelApiKey
        id
        einzelbild {
          alt
          filename
          title
          url
          width
          height
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
`;
