export function plus(x, y) {
    return x + y;
  }

  export function minus(x, y) {
    return x - y;
  }

  export function getColorsFromArray(input){
    let colors=[];
    input.map((forschungsfeld) => {
      colors.push(forschungsfeld.colour.hex)
    })
    return colors;
  }

export function getColorArray(input){
  // get Array of colors from all tags
  const colorArray = input.reduce((acc, it) => {
    acc.push(it.colour.hex);
    return acc;
  }, []);
  return colorArray;
}


export function getGradientBackgroundStyle(gradient,anim,opac){
  return {
    background: gradient,
    opacity:opac,
    animation:anim,
  }
}

export function makeGradient(col0,col1,gradientStyle="to right"){
  return  `linear-gradient(${gradientStyle}, ${col0}, ${col1})`;
}
      
         


 export  function handleHover (isHover) {
    if(isHover){
        dispatch({ type: ACTIONS.ADD_HOVER_FILTER, payload: { element: researchFieldIdArray} })
        setHoverGradient(true)
    }else{
        dispatch({ type: ACTIONS.REMOVE_HOVER_FILTER, payload: { element: researchFieldIdArray } })
        setHoverGradient(false)
    }
};