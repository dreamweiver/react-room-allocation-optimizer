import store from './index';

describe('Create store', () => {
	it('Should return default state', () => {
		// prepare
		let actualState;
		const expectedState = {
								form : {},
								guestList : {
									guestList : []
								}
							};

		// execute
		actualState = store.getState();

		// assert
		expect(actualState).toEqual(expectedState);
	});
});