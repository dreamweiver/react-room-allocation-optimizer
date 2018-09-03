//default state to be returned with empty guest list
let defaultState={
    guestList:[]
}

// Guest List reducer to handle multiple actions based on the type of action
const guestListReducer=(state=defaultState, action)=>{
	if(action.type === "FETCH_LIST"){
		return {
			...state,
			guestList: action.guestList
		}
	}
	else{
        return{
            ...state // return only state when no action is specified
        }
    }
}

export default guestListReducer;