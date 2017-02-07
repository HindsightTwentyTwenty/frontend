import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {render} from 'react-dom';
import Star from '../Star/Star.js';
import * as LookbackActions from '../../actions/App/LookbackActions.js';
import * as StarActions from '../../actions/Star/StarActions.js';
import * as CategoryActions from '../../actions/Category/CategoryActions.js';


function getState() {
  return {
    iframe_show:false,
    iframehider_show:false
  }
}
class PageUrlBar extends Component {

  constructor(props) {
    super(props);
    this.state = getState();
    this.firstFetch = true;
    this.catsAndPages = null;
  }

  getCategories() {
    var _this = this;
    this.props.category_actions.fetchCategoriesAndPages(this.props.currentUser.token);
    return this.props.page.categories.map(function(category){
      return <div className={'url-bar-category'} key={category.title}>
          {category.title}
          <div className='url-bar-category-times' onClick={()=>{
              _this.props.category_actions.toggleCategory(_this.props.page.url, category, false, _this.props.currentUser.token);
            }}>
            <i className='fa fa-times'></i>
            </div>
          </div>;
      });
    }
  }

  getDOM(){
    this.props.lookback_actions.getDOM(this.props.visit_pk, this.props.currentUser.token);
  }

  openIframe(event){
    this.setState({ iframehider_show: true });
    this.setState({ iframe_show: true });
    this.getDOM();
  }

  closeIframe(event){
    this.setState({ iframehider_show: false });
    this.setState({ iframe_show: false });
    this.props.lookback_actions.clearDOM();
  }

  render() {
    var starred = this.props.page.star ? 'fa fa-star fa-2x star-categories' : 'fa fa-star-o fa-2x star-categories';
    return (
      <div className={'url-bar'}>
        {(this.props.search_items.dom && this.state.iframe_show) ?
            <div className="modal-base" id="iframe-modal">
                <button id="iframe-close-button " onClick={this.closeIframe.bind(this)}>
                  x
                </button>
                <iframe className="m-iframe" srcDoc={this.props.search_items.dom}></iframe>
            </div>
        : ''}
        {(this.state.iframehider_show && this.props.search_items.dom ) ? <div className="hider" onClick={this.closeIframe.bind(this)} id="iframe-hider"></div>: ''}
        <a className={'url'} target="_blank" href={this.props.page.url}>{this.props.page.title}</a>
        <div className='url-categories'>
          {this.getCategories()}
          <div onClick={()=>{
            this.props.star_actions.toggleStar(this.props.page, this.props.currentUser.token);
            }}>
            <i className={starred}></i>
          </div>
          <button id="iframe-open-button" onClick={this.openIframe.bind(this)}>
            <span className="glyphicon glyphicon-eye-open"></span>
          </button>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    currentUser : state.currentUser,
    currentPage : state.currentPage,
    search_items: state.search

})

let mapDispatchToProps = (dispatch) => ({
  lookback_actions: bindActionCreators(LookbackActions, dispatch),
  star_actions: bindActionCreators(StarActions, dispatch),
  category_actions: bindActionCreators(CategoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PageUrlBar);
