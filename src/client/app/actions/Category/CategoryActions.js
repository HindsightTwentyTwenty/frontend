import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

const addCategoryEndpoint = urls.BASE_URL + "addcategory/";
const allCategoriesEndpoint = urls.BASE_URL + "categories/";
const addPageCategoryEndpoint = urls.BASE_URL + "addcategorypage/";
const deleteCategoryEndpoint = urls.BASE_URL + "deletecategory/";

export function pushCategory(category, color, token){
  return dispatch => {
    return fetch(addCategoryEndpoint, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + token
             },
             method: "POST",
             body: JSON.stringify({category: category, color: color})
           }
      )
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_PUSH_CATEGORY,
        category_added: json
      })
    )
  }
}

export function fetchCategories(token){
  return dispatch => {
    return fetch(allCategoriesEndpoint,{
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + token
       },
       method: "GET"
    })
      .then(response => response.json())
      .then(json => dispatch({
        type: types.RECEIVE_CATEGORIES,
        categories: json
      }))
  }
}


export function toggleColorPicker(show) {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_COLOR_PICKER,
      showColorPicker: show
    })
  }
}

export function toggleShowStarred() {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_SHOW_STARRED
    })
  }
}

export function setEditCatColor(color) {
  return dispatch => {
    dispatch({
      type: types.SET_EDIT_CAT_COLOR,
      color: color
    })
  }
}
