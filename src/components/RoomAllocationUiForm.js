import React from 'react';
import { Field, reduxForm} from 'redux-form';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import validate from './../validations/basicValidation';
import renderTextField from  './renderTextField';
import Divider from  '@material-ui/core/Divider'

// component level css styles
const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

// Redux form for Hotel Room Allocation
let RoomAllocationUiForm = props => {
  const { 
    handleSubmit, 
    pristine, 
    reset, 
    submitting , 
    classes,
  } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="classes.root">
          <Grid container spacing={24}>
            <Grid item xs={12} md={12}>
              <Field
                name="premiumRoomCount"
                component={renderTextField}
                label="Available Premium Rooms"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Field 
                name="economyRoomCount" 
                component={renderTextField} 
                label="Available Economy Rooms"
                type="number" 
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <button variant="contained" color="primary" className={classes.button} type="submit" disabled={pristine || submitting}>
            Best Allocation
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Entries
          </button>
        </div>
      </form>
      <Divider />
    </div>
  );
};

// apply component level styles and create a instance of redux form 
RoomAllocationUiForm = withStyles(styles) (
    reduxForm({
      form: 'RoomAllocationUiForm', // a unique identifier for this form
      validate,
    })(RoomAllocationUiForm)
);

export default RoomAllocationUiForm;
