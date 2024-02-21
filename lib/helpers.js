export function plus(x, y) {
  return x + y;
}

export function minus(x, y) {
  return x - y;
}

export function getColorsFromArray(input) {
  let colors = [];
  input.map((forschungsfeld) => {
    colors.push(forschungsfeld.colour.hex);
  });
  return colors;
}

export function getColorArray(input) {
  const colorArray = input.reduce((acc, it) => {
    acc.push(it.colour.hex);
    return acc;
  }, []);

  if (colorArray.length < 1) {
    colorArray[0] = "var(--maincolor)";
    colorArray[1] = "var(--secondcolor)";
  }
  if (colorArray.length < 2) {
    colorArray[1] = "var(--secondcolor)";
  }

  return colorArray;
}

export function getGradientBackgroundStyle(gradient, anim, opac) {
  return {
    background: gradient,
    opacity: opac,
    animation: anim,
  };
}

export function makeGradient(col0, col1, gradientStyle = "to right") {
  return `linear-gradient(${gradientStyle}, ${col0}, ${col1})`;
}

export function makeGradientFromArray(colorarray, gradientStyle = "to right") {
  return `linear-gradient(${gradientStyle},${colorarray.join(",")})`;
}

export function handleHover(isHover) {
  if (isHover) {
    dispatch({
      type: ACTIONS.ADD_HOVER_FILTER,
      payload: { element: researchFieldIdArray },
    });
    setHoverGradient(true);
  } else {
    dispatch({
      type: ACTIONS.REMOVE_HOVER_FILTER,
      payload: { element: researchFieldIdArray },
    });
    setHoverGradient(false);
  }
}

export function searchInput(data, inputvalue) {
  return data.filter((obj) => {
    return Object.keys(obj).some((key) => {
      if (Array.isArray(obj[key])) {
        return obj[key].some((entry) => {
          return Object.keys(entry).some((kkey) => {
            if (
              typeof entry[key] === "string" ||
              entry[key] instanceof String
            ) {
              return entry[kkey]
                .toString()
                .toLowerCase()
                .includes(inputvalue.toLowerCase());
            }
          });
        });
      } else {
        if (typeof obj[key] === "string" || obj[key] instanceof String) {
          return obj[key].toLowerCase().includes(inputvalue.toLowerCase());
        }
      }
    });
  });
}

export function searchInputArray(data, searchKeyArray) {
  return data.filter((obj) => {
    // some für oder, every für und
    return searchKeyArray.every(function (searchKey) {
      return Object.keys(obj).some((key) => {
        if (Array.isArray(obj[key])) {
          return obj[key].some((entry) => {
            return Object.keys(entry).some((kkey) => {
              if (
                typeof entry[kkey] === "string" ||
                entry[kkey] instanceof String
              ) {
                return entry[kkey]
                  .toString()
                  .toLowerCase()
                  .includes(searchKey.toLowerCase());
              }
            });
          });
        } else {
          if (obj[key] != null) {
            return obj[key]
              .toString()
              .toLowerCase()
              .includes(searchKey.toLowerCase());
          }
        }
      });
    });
  });
}

export function searchInputArrayRecursive(data, searchKeyArray, fields) {
  return data.filter((d) => {
    return searchKeyArray.every(function (searchKey, index) {
      return f(d, searchKey, "", fields);
    });
  });
}

export function searchRecursive(data, inputvalue, fields) {
  return data.filter((d) => {
    return f(d, inputvalue, "", fields);
  });
}

let f = (e, iv, parentkey, fields) => {
  if (Array.isArray(e)) {
    return e.some((ee) => {
      return f(ee, iv, parentkey, fields);
    });
  } else if (typeof e === "object" && e !== null) {
    return Object.keys(e).some((key) => {
      return f(e[key], iv, key, fields);
    });
  } else {
    if ((e !== null && typeof e === "string") || e instanceof String) {
      if (fields.includes(parentkey)) {
        return e.toString().toLowerCase().includes(iv.toLowerCase());
      }
    }
  }
};

export const getIntersection = (arrays) => {
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
};

export const PublicationFilter = [
  {
    id: 0,
    titel: "Conference Item",
    term: "conference_item",
    colour: { hex: "#FF0000" },
  },
  {
    id: 1,
    titel: "Book",
    term: "book",
    colour: { hex: "#FF0000" },
  },
  {
    id: 2,
    titel: "Book Section",
    term: "book_section",
    colour: { hex: "#FF0000" },
  },

  {
    id: 3,
    titel: "Article",
    term: "article",
    colour: { hex: "#FF0000" },
  },

  {
    id: 4,
    titel: "Magazine Article",
    term: "magazine_article",
    colour: { hex: "#FF0000" },
  },
  {
    id: 5,
    titel: "Audio Visual",
    term: "audio_visual",
    colour: { hex: "#FF0000" },
  },
  {
    id: 6,
    titel: "Other",
    term: "other",
    colour: { hex: "#FF0000" },
  },
  {
    id: 7,
    titel: "Report",
    term: "report",
    colour: { hex: "#FF0000" },
  },
  {
    id: 8,
    titel: "Thesis",
    term: "thesis",
    colour: { hex: "#FF0000" },
  },
  {
    id: 9,
    titel: "Software",
    term: "software",
    colour: { hex: "#FF0000" },
  },
  {
    id: 10,
    titel: "Working Paper",
    term: "working_paper",
    colour: { hex: "#FF0000" },
  },
];

export function getForschungsfeldId(f) {
  let id;
  switch (f) {
    case "BFH-OE--RU-0043":
      id = "34112681";
      break;

    case "BFH-OE--RU-0069":
      id = "34113206";
      break;

    case "BFH-OE--RU-0019":
      id = "34113257";
      break;

    case "BFH-OE--RU-0012":
      id = "34113259";
      break;

    case "BFH-OE--RU-0013":
      id = "34113265";
      break;

    case "BFH-OE--RU-0116":
      id = "34113266";
      break;

    default:
      // Anweisungen werden ausgeführt,
      // falls keine der case-Klauseln mit expression übereinstimmt
      break;
  }
  return id;
}

export function getForschungsfeldBFHString(f) {
  let id;
  switch (f) {
    case "34112681":
      id = "BFH-OE--RU-0043";
      break;

    case "34113206":
      id = "BFH-OE--RU-0069";
      break;

    case "34113257":
      id = "BFH-OE--RU-0019";
      break;

    case "34113259":
      id = "BFH-OE--RU-0012";
      break;

    case "34113265":
      id = "BFH-OE--RU-0013";
      break;

    case "34113266":
      id = "BFH-OE--RU-0116";
      break;

    default:
      break;
  }
  return id;
}

/*
Knowledge Vis: BFH-OE--RU-0043  34112681
Social Communication: BFH-OE--RU-0069  34113206
Environmental :BFH-OE--RU-0019  34113257
Rhethoric :BFH-OE--RU-0012  34113259
History :BFH-OE--RU-0013  34113265
HCCD :BFH-OE--RU-0116   34113266
*/
