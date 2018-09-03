import React from 'react';
import TextField from 'material-ui/TextField';

// construct custom Text field using Material Ui
const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

export default renderTextField;