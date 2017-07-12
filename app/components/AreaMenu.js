import React from 'react';
import { Link } from 'react-router';
import { connect, dispatch } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import DropdownMenu from './Dropdownmenu.js'
import AreaButton from './AreaButton.js'

class AreaMenu extends React.Component{

  componentDidMount(){
    this.props.onMount();
  }

  render() {
    const style = {
      background: "grey",
      fontFamily: "sans",
      float: "right",
      height: "100%",
    }

    var id = "areamenu"
    var areas = this.props.areas.map(area => {
      console.log(area)
      return <AreaButton area={area.name}/>
    })
    var title;
    if (this.props.area) title = this.props.area.name;
    else title = "No categories";
    return (
      <DropdownMenu menu_id={id} title={title}>
        {areas}
      </DropdownMenu>
    )
  }
}

function mapStateToProps(state) {
    return {
      area: state.areas.selected,
      areas: state.areas
    }
  }

function mapDispatchToProps(dispatch) {
  return {
    onMount () {
      console.log("mount area")
      dispatch(actionCreators.fetchAreas());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AreaMenu);