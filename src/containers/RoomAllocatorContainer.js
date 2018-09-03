import React from 'react';
import {connect} from "react-redux";
import * as actionCreators from "./../actions"
import RoomAllocator from "./../components/RoomAllocator.js";

// Container to bind redux state to RoomAllocator component
class RoomAllocatorContainer extends React.Component{

    render(){
        return(
        	 <RoomAllocator handleOnLoad = {this.props.loadGuestList} list = {this.props.guestList}/>
		)
    }
}

// Map state to props, so that it can be passed to descendant components
const mapStateToProps=(state)=>{
    return state
};

// bind the Actions to component
export default connect (mapStateToProps, actionCreators)(RoomAllocatorContainer);