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
  // get Array of colors from all tags
  const colorArray = input.reduce((acc, it) => {
    acc.push(it.colour.hex);
    return acc;
  }, []);
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
];
