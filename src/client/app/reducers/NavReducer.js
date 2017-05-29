import * as types from '../constants/ActionTypes';
import * as LookBackSections from '../constants/LookBackConstants.js'

function NavReducer(state = {selection: 0, searchTerm: "", categoriesView: "select"}, action){
  switch(action.type){
    case types.SWITCH_MENU_SELECTION:

      // Handle Selected Highlighting in the Navbar
      if(state.menuSelection != LookBackSections.Search){
        document.getElementById("nav-bar-button-" + state.menuSelection).classList.remove('nav-bar-button-selected');
      }
      if(action.lookBackSelection != LookBackSections.Search){
        document.getElementById("nav-bar-button-" + action.menuSelection).classList.add('nav-bar-button-selected');
      }

      return {...state, menuSelection: action.menuSelection, searchTerm: action.searchTerm}
    case types.SWITCH_CATEGORY_VIEW:
        return {...state, categoriesView: action.newView}
    default:
        return state;
  }
}

export default NavReducer;