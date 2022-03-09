import { data } from "../../../lib/export_arbor_JSON";

//https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839

export default (req, res) => {
  //res.status(200).json(data);
  res.status(200).json({ name: "John Doe" });
};
