import Index from './index.js';


describe('Root component', () => {
	it('renders without crashing', () => {
	  expect(JSON.stringify(Index)).toMatchSnapshot();
	});
});