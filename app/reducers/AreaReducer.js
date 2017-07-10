const AreaReducer = (state = [], action) => {
  if(action.type === "addAreaSuccess"){
    console.log(state, action)
    var areas;
    if(state)
      areas = state.concat();
    else {
       areas = [];
    }
    areas.push(action.area);
    areas.selected = action.area;
    return areas;
  } else if(action.type === "gotAreas") {
    var areas = action.areas;
    if(areas.length === 0){
      areas.selected = null;
    } else if (areas.length === 1){
      areas.selected = areas[0];
    } else {
      var i;
      if((i = areas.indexOf(state.selected)) !== -1){
        areas.selected = areas[i];
      } else {
        areas.selected = null;
      }
    }
    return areas;
  } else {
    if(state.length === 0) state.selected = null;
    return state;
  }
}

export default AreaReducer;
