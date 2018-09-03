import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './stores';
import RoomAllocationUiForm from './components/RoomAllocationUiForm';
import RoomAllocatorContainer from './containers/RoomAllocatorContainer';
import registerServiceWorker from './registerServiceWorker';

// Root element to which the main component would be binded to 
const rootEl = document.getElementById('root') || document.createElement('div');

// Create fake promise callback to resolve submit action
const showResults = values => new Promise(resolve => resolve());

ReactDOM.render( 
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <section style={{ padding: 15 }}>
        <h2>RAO - Room Allocation Optimizer</h2>
        <RoomAllocationUiForm onSubmit={showResults} />
        <RoomAllocatorContainer/>
      </section>
    </MuiThemeProvider>
  </Provider>,
  rootEl,
);

registerServiceWorker();
