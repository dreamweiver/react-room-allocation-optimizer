import axios from "axios";

// action to load Guests price list from remote service(gist)
export function loadGuestList(){

    return(dispatch)=>{
        return axios.get("https://gist.githubusercontent.com/fjahr/b164a446db285e393d8e4b36d17f4143/raw/75108c09a72a001a985d27b968a0ac5a867e830b/smarthost_hotel_guests.json")
        .then((response)=>{
            // dispatch 'FETCH_LIST' action with response data tp trigger respective reducer
            dispatch( {
					type:"FETCH_LIST",
					guestList: response.data
				});
        })
        .catch(error => {
            console.log("failed to fetch Guest List, detailed error messsage is here:" + error);
        });
    }
}