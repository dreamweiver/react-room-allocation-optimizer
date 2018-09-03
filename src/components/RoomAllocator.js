import React, {Component} from 'react';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import { formValueSelector, hasSubmitSucceeded} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from  '@material-ui/core/Divider';

class RoomAllocator extends Component {
   
	// get all potential guest's list from external source (gist)
	componentDidMount(){
		this.props.handleOnLoad(); // trigger the action to fetch guest list
	}

	// Compute the best room allocation based on users preferences
	getBestAllocation(formValues) {
		let 
			{ 
				premiumRoomCount: availablePremiumRooms, 
				economyRoomCount: availableEconomyRooms 
			} = formValues;

		// get the potenetial guest Price list (retrieved from remote gist)
		const potentialGuests = formValues.list.guestList;

		// sort the pirce list by desceding order
		const sortedGuestPriceList =  potentialGuests.sort((a, b) => b - a);

		// group the sorted price list by Econmoy and Premium Class
		// Economy class = EUR 1 to EUR 99 
		// Premium Class = EUR 100 or more
		const premiumGuestsList = sortedGuestPriceList.filter(price => price > 99);
		const economyGuestsList = sortedGuestPriceList.filter(price => price > 1 && price < 100);

		const preGuestCount = premiumGuestsList.length; // no of Economy class guest
		const ecoGuestCount = economyGuestsList.length; // no of premium class guest

		// optimum Room allocation with total count and tariff of respective class
		let bestAllocation = {
			premiumRoom : {
				count: 0,
				totalTariff : 0
			},
			economyRoom : {
				count: 0,
				totalTariff : 0
			},
			totalTariffAcrossCategory : 0
		}

		// reducer to addup  all values present in  array
		const reducer = (accumulator, currentValue) => accumulator + currentValue;

		availablePremiumRooms = availablePremiumRooms - preGuestCount;
		availableEconomyRooms = availableEconomyRooms - ecoGuestCount;

		// room allocation check for Premium guests against available premium rooms at hotel
		if(availablePremiumRooms > 0) {
			bestAllocation.premiumRoom.count = preGuestCount;
			bestAllocation.premiumRoom.totalTariff = premiumGuestsList.reduce(reducer)
		} else {
			bestAllocation.premiumRoom.count = formValues.premiumRoomCount
			bestAllocation.premiumRoom.totalTariff = premiumGuestsList.slice(0, formValues.premiumRoomCount).reduce(reducer);
		}

		// room allocation check for Premium guests against available premium rooms at hotel
		if(availableEconomyRooms > 0) {
			bestAllocation.economyRoom.count = ecoGuestCount;
			bestAllocation.economyRoom.totalTariff = economyGuestsList.reduce(reducer);
		} else {
			// allocate premium rooms for economy customer , if any
			bestAllocation.economyRoom.count = availablePremiumRooms > 0 ? 
												(formValues.economyRoomCount + availablePremiumRooms) : 
												formValues.economyRoomCount ;
			bestAllocation.economyRoom.totalTariff = economyGuestsList.slice(0, bestAllocation.economyRoom.count).reduce(reducer);
		}

		// Total potential tariff for hotel (inclusive of all class guests)
		bestAllocation.totalTariffAcrossCategory = bestAllocation.premiumRoom.totalTariff + bestAllocation.economyRoom.totalTariff; 

		// conclude the best room allocation with the total tariffs against each catergory
		return bestAllocation;
	}

	render() {		
		// if Form is submitted, compute the Best possible allocation of rooms 
		// as per given guest list
		if(this.props.isFormSubmitted) {
			const roomAllocations = this.getBestAllocation(this.props)

			return (
				<section >
					<Paper style={{ marginTop: 20 , padding: 15, backgroundColor: "#EEEEEE"}} elevation={3}>
				        <Typography variant="display1" gutterBottom >
				          Optimum allocation of Rooms
				          <Divider/>
				        </Typography>
						<Grid container spacing={16}>
							<Grid item xs={12} >
							  <Typography >Premium Room Usage => {roomAllocations.premiumRoom.count} ( EUR - {roomAllocations.premiumRoom.totalTariff})</Typography>
							</Grid>
							<Grid item xs={12} >
							  <Typography >Economy Room Usage => {roomAllocations.economyRoom.count}  ( EUR - {roomAllocations.economyRoom.totalTariff})</Typography>
							</Grid>
							<Grid item xs={12} >
							  <Typography gutterBottom>Total Potential Tariff (per day)  (EUR {roomAllocations.totalTariffAcrossCategory})</Typography>
							</Grid>
						</Grid>
			      </Paper>
	          	</section>
			)
		}
		else {
			return null
		}
	}
}

// Form selector to extract the value from "RoomAllocationUiForm" redux-form
const selector = formValueSelector('RoomAllocationUiForm');
RoomAllocator = connect(state => {
	const {premiumRoomCount, economyRoomCount} = selector(state, 'premiumRoomCount', 'economyRoomCount');
	const isFormSubmitted = hasSubmitSucceeded('RoomAllocationUiForm')(state);

	return {
		isFormSubmitted,
		premiumRoomCount,
		economyRoomCount
	}
})(RoomAllocator)


export default RoomAllocator;