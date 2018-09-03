import React from 'react';
import { shallow , mount }  from 'enzyme';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from 'redux-mock-store'
import RoomAllocator from './RoomAllocator';

Enzyme.configure({ adapter: new Adapter() });

describe('<RoomAllocator />', () => {
	const initialState = {guestList: [1, 2, 3]}
	const mockStore = configureStore();
	let container;
	let store;
	let mockedHandleOnLoad;
	let mockGuestsPriceList = [23, 45, 155, 374, 22, 99, 100, 101, 115, 209];

	beforeEach(()=>{
        store = mockStore(initialState)
        mockedHandleOnLoad = jest.fn();
        container = shallow(
							    <RoomAllocator
							    	handleOnLoad={mockedHandleOnLoad}
							    	list={initialState.guestList}
							    	store={store}
							    />
							);
    });

	it('should render without failing', () => {
		expect(container.length).toEqual(1);
	});

	it('Should match prop with initialState', () => {
        expect(container.prop('list')).toEqual(initialState.guestList);
    });

    it('Should dispatch handleOnLoad action', () => {
        container.prop('handleOnLoad')();
  		expect(mockedHandleOnLoad).toHaveBeenCalled();
    });

    it('Should return Best room allocation for available rooms 3 (ECO) 3(PRE)', () => {
		let formValues = {
							premiumRoomCount: 3,
							economyRoomCount: 3,
							list : {
								guestList : mockGuestsPriceList
							}
						};

		let expectedBestAllocation = {
										premiumRoom : {
											count: 3,
											totalTariff : 738
										},
										economyRoom : {
											count: 3,
											totalTariff : 167
										},
										totalTariffAcrossCategory : 905
									}; 

        const actualBestAllocation = container.dive().instance().getBestAllocation(formValues);

        expect(actualBestAllocation).toEqual(expectedBestAllocation);
    });

    it('Should return Best room allocation for available rooms 2 (ECO) 7(PRE)', () => {
		let formValues = {
							premiumRoomCount: 2,
							economyRoomCount: 7,
							list : {
								guestList : mockGuestsPriceList
							}
						};

		let expectedBestAllocation = {
										premiumRoom : {
											count: 2,
											totalTariff : 583
										},
										economyRoom : {
											count: 4,
											totalTariff : 189
										},
										totalTariffAcrossCategory : 772
									}; 

        const actualBestAllocation = container.dive().instance().getBestAllocation(formValues);

        expect(actualBestAllocation).toEqual(expectedBestAllocation);
    });


    it('Should return Best room allocation for available rooms 7 (ECO) 5(PRE)', () => {
		let formValues = {
							premiumRoomCount: 7,
							economyRoomCount: 5,
							list : {
								guestList : mockGuestsPriceList
							}
						};

		let expectedBestAllocation = {
										premiumRoom : {
											count: 6,
											totalTariff : 1054
										},
										economyRoom : {
											count: 4,
											totalTariff : 189
										},
										totalTariffAcrossCategory : 1243
									}; 

        const actualBestAllocation = container.dive().instance().getBestAllocation(formValues);

        expect(actualBestAllocation).toEqual(expectedBestAllocation);
    });

});