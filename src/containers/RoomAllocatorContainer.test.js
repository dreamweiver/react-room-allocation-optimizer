import React from 'react';
import { shallow }  from 'enzyme';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from 'redux-mock-store'
import RoomAllocatorContainer from './RoomAllocatorContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('<RoomAllocatorContainer />', () => {
	 const initialState = {guestList: [1, 2, 3]}
	 const mockStore = configureStore();
	 let container;
	 let store;

	beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(
							    <RoomAllocatorContainer 
							    	store={store}
							    />
							  );
    })

	it('should render without failing', () => {
		expect(container.length).toEqual(1);
	});

	it('Should match prop with initialState', () => {
       expect(container.prop('guestList')).toEqual(initialState.guestList);
    });

});