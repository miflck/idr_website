"use strict";

const fs = require("fs");

const fields = [
  "abstract",
  "contributors",
  "creators",
  "divisions",
  "event_location",
  "official_url",
  "title",
  "type",
  "date",
  "uri",
];

// Had to wrap this in an anonymous async function in order to get this
// working with `node app.js`. Don't know how this was executed before.
(async () => {

  // These strings build the Arbor API URL
  const base_url      = 'https://arbor.bfh.ch/server/api/discover/search/objects',
        search_params = '?sort=score,DESC&f.entityType=Publication,equals&query=%22Institute+of+Design+Research%22&size=100&page=';

  // Since we have paginated results, we need to keep track of current and total pages
  let   page_index    = 0,
        total_pages   = 0,
        pages         = [],
        object_index  = 0,
        total_objects = 0,
        objects       = [],
        publications  = [];

  console.log(`${base_url}${search_params}${page_index}`)

  // We grab the first result to know how many pages we have to go through.
  // The Arbor API limits results per page to 100, which is hardcoded in the string above.

  console.log('Grabbing search result pages.')

  const res_0 = await fetch(`${base_url}${search_params}${page_index}`)

  pages[0] = await res_0.json()
  total_pages = pages[0]['_embedded']['searchResult']['page']['totalPages']

  console.log(`Got page ${page_index+1} of ${total_pages}.`)
  page_index++


  // Now we know how many pages there are, we're grabbing all of them.
  while (page_index < total_pages) {
    const res = await fetch(`${base_url}${search_params}${page_index}`)
    pages[page_index] = await res.json()

    console.log(`Got page ${page_index+1} of ${total_pages}.`)
    page_index++
  }

  console.log(`We got ${pages.length} pages in total.`)

  // We've got all publications, let's translate them into the structure we need
  // The data for an entry is in _embedded.searchResult._embedded.objects[]._embedded.indexableObject.metadata
  // I marked the mapped fields in the values in this example json

  const example = {
    title: ["dc.title"],
    date: "dc.date.issued",
    uri: "dc.identifier.uri", 
    official_url: "oairecerif.identifier.url",
    contributors: [ 
      "dc.contributor.author[]",
    ],
    creators: [
      "dc.contributor.author[]",
    ],
    abstract: [
      "dc.description.abstract[]",
    ],
    type: "dc.type",
    divisions: [
      "cris.virtual.division[]",
      "cris.virtual.institute[]",
      "cris.virtual.researchUnit[]",
    ],
  }

  // Loop through all pages and the search result objects that they contain
  console.log('Looping through pages and collecting all objects.')
  
  pages.forEach(page => {
    page['_embedded']['searchResult']['_embedded']['objects'].forEach(object => {
      total_objects++
      objects.push(object)
    });
  })

  console.log(`We have ${total_objects} objects in total.`)

  // Loop through all objects and map their attributes to our structure
  console.log('Looping through all objects and mapping them to our publication structure.')

  objects.forEach(object => {

    // This is the structure our publication object needs to adhere to
    let publication = {
          title: [],
          date: "",
          uri: "", 
          official_url: "",
          creators: [],
          contributors: [],
          abstract: [],
          type: "",
          divisions: [],
        },
        metadata    = object['_embedded']['indexableObject']['metadata'];

    // Map the search result structure to ours
    metadata['dc.title'].forEach(title => {
      publication.title.push(title.value)
    })
    publication.date = metadata['dc.date.issued'][0].value
    publication.uri = metadata['dc.identifier.uri'][0].value

    if(metadata.hasOwnProperty('oairecerif.identifier.url')) {
      publication.official_url = metadata['oairecerif.identifier.url'][0].value
    }
    
    if(metadata.hasOwnProperty('dc.contributor.author')) {
      metadata['dc.contributor.author'].forEach(author => {
        publication.creators.push(author.value)
        publication.contributors.push(author.value)
      })
    }

    // abstracts are not always present
    if(metadata.hasOwnProperty('dc.description.abstract')) {
      metadata['dc.description.abstract'].forEach(abstract => {
        publication.abstract.push(abstract.value)
      })
    }
    publication.type = metadata['dc.type'][0].value
    
    // divisions are not always present
    // these values need to be prepended with 'BFH-OE--' for legacy reasons
    if(metadata.hasOwnProperty('cris.virtual.division')) {
      metadata['cris.virtual.division'].forEach(division => {
        publication.divisions.push('BFH-OE--'+division.value)
      })
    }
    if(metadata.hasOwnProperty('cris.virtual.institute')) {
      metadata['cris.virtual.institute'].forEach(division => {
        publication.divisions.push('BFH-OE--'+division.value)
      })
    }
    if(metadata.hasOwnProperty('cris.virtual.researchUnit')) {
      metadata['cris.virtual.researchUnit'].forEach(division => {
        publication.divisions.push('BFH-OE--'+division.value)
      })
    }

    // building our collection of publications
    publications.push(publication)
  })

  // let's sort the publications quickly by date
  publications.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  })


  // We're ready to dump our cleaned search results
  let filename = `./publications-${new Date().toISOString().split('T')[0]}.json`
  console.log(`Done mapping and writing results to ${filename}.`)

  fs.writeFileSync(filename, JSON.stringify(publications, null, 2), 'utf-8');

  // I then copy the resulting output into the pages/api/dataProcessing.js file
  // as the value of export data = …

})();

// Below is the old code, that I leave for legacy reasons. 2026-02-16

//const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
//const publicationdata = await res.json()

// let rawdata = fs.readFileSync("data.json");
// let student = JSON.parse(rawdata);

// student.forEach((x, i) => {
//   Object.entries(x).forEach((entry) => {
//     let [key, value] = entry;
//     if (fields.includes(key)) {
//       if (key === "contributors" || key === "creators") {
//         let names = [];
//         value.forEach((creator) => {
//           names.push(creator.name.given + " " + creator.name.family);
//         });
//         x[key] = names;
//       }
//       if (key === "title" || key === "abstract") {
//         let title = [];
//         value.forEach((t) => {
//           title.push(t.text);
//         });
//         x[key] = title;
//       }
//     } else {
//       delete x[key];
//     }
//   });
// });
// console.log(student[0].uri);
// fs.writeFileSync(
//   "./dataProcessed.json",
//   JSON.stringify(student, null, 2),
//   "utf-8"
// );

//console.log(student[0]);
//delete student[0].collection_title;
//console.log(student[0]);
