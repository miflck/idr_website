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

//const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
//const publicationdata = await res.json()

let rawdata = fs.readFileSync("data.json");
let student = JSON.parse(rawdata);

student.forEach((x, i) => {
  Object.entries(x).forEach((entry) => {
    let [key, value] = entry;
    if (fields.includes(key)) {
      if (key === "contributors" || key === "creators") {
        let names = [];
        value.forEach((creator) => {
          names.push(creator.name.given + " " + creator.name.family);
        });
        x[key] = names;
      }
      if (key === "title" || key === "abstract") {
        let title = [];
        value.forEach((t) => {
          title.push(t.text);
        });
        x[key] = title;
      }
    } else {
      delete x[key];
    }
  });
});
fs.writeFileSync(
  "./dataProcessed.json",
  JSON.stringify(student, null, 2),
  "utf-8"
);

//console.log(student[0]);
//delete student[0].collection_title;
//console.log(student[0]);
