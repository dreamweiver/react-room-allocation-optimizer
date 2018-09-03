export default function(values) {
  const errors = {};
  const requiredFields = [
    'premiumRoomCount',
    'economyRoomCount',
  ];

  //  Required field validation 
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  // Field specific validation
  if (
    values.premiumRoomCount &&
    isNaN(Number(values.premiumRoomCount))
  ) {
    errors.premiumRoomCount = 'Must be a number';
  }

  if (
    values.economyRoomCount &&
    isNaN(Number(values.economyRoomCount))
  ) {
    errors.economyRoomCount = 'Must be a number';
  }

  //  finally return all errors
  return errors;
}
