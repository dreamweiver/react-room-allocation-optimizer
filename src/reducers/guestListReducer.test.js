import guestListReducer from './guestListReducer.js';

describe('Guest List Reducer', () => {
	it('should return default state, when no state is passed', () => {
	  // prepare
	  let reducer;
	  const state = undefined;
	  let expectedGuestList = [];
	  const action = {
				  	type : "init"
				  }

	  // execute
	  reducer = guestListReducer(state, action);

	  // assert
	  expect(reducer.guestList).toEqual(expectedGuestList);
	});

	it('should return new state, when FETCH_LIST action dispatched', () => {
		// prepare
		let reducer;
		const state = {
					  	guestList : [2, 3]
					  }
		const action ={
					  	type : 'FETCH_LIST',
					  	guestList: [2, 3, 4]
					  }


	  // execute
	  reducer = guestListReducer(state, action);

	  // assert
	  expect(reducer.guestList).toBe(action.guestList);
	});

});