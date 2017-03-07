import * as types from '../constants/ActionTypes';
import * as GlobalConstants from '../constants/GlobalConstants';

function categoryReducer(state = {cats: {}, editCatColor: GlobalConstants.DEFAULT_CAT_COLOR,
      showColorPicker: false}, action){
  switch(action.type){
    case types.SET_EDIT_CAT_COLOR:
      return {...state, editCatColor: action.color}
    case types.TOGGLE_COLOR_PICKER:
      return {...state, showColorPicker: action.showColorPicker}
    case types.RECEIVE_CATEGORIES:
      var categoryObject = {};
      action.categories.map(function(category) {
        categoryObject[category.pk] = category;
      })
      return {...state, cats: categoryObject};
    case types.RECEIVE_PUSH_CATEGORY:
      var newCategoryList = Object.assign({}, state.cats);
      var newCategory = action.category_added;
      newCategoryList[newCategory.pk] = newCategory;
      return {...state, cats: newCategoryList};
    default:
      return state;
  }
}

export default categoryReducer;
