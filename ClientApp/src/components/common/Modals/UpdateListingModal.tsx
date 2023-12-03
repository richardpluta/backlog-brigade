import React, { ReactNode, useState, MouseEvent, FormEvent, useEffect } from "react";
import listing from "../../../models/listingData";
import { useAuth0 } from "@auth0/auth0-react";
import LoggedInUser from "../../../models/userData";
import {ListingPutService} from "../../../services/ListingPutService";
import "./UpdateListingModal.css";

interface ModalType {
	children?: ReactNode;
	isOpen: Boolean;
	toggle: () => void;
    data?: listing;
}

const DUMMY_USER:LoggedInUser = {
		userID: 123,
		userType: 0,
		userName: "DummyUserFromModal",
		phone: 987654321,
		email: "nam@email.com",
		skillSet: 0,
		zip: '12345',
		userRate: 0,
}

const UpdateListingModal = (props: ModalType) => {

	const {getAccessTokenSilently} = useAuth0();
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {
		(async () => {
		  await getAccessTokenSilently().then(async (token) => {
			setAccessToken(token);
		  });
		})();
	  }, []);

	  
	const onSubmit = async (event: any) => {
		event.preventDefault();
        const newRate = event.currentTarget[0].value;
		const newSkills = event.currentTarget[1].value;
		const newDesc = event.currentTarget[2].value;

		const newListing = props.data;
		newListing!.expectedRate = Number(newRate);
		newListing!.skillSet = Number(newSkills);
		newListing!.postContent = newDesc;
		newListing!.user = DUMMY_USER;

		await ListingPutService(newListing).then(
			(res:any) => {
				console.log(res);
				window.location.reload();
			}	
		)
	}

	return(

		<>
			{props.isOpen && (
				<div className="overlay">
					<div className="box">
						<form className="update-listing-form" onSubmit={onSubmit}>
							<h1>Please Update Your Listing Information:</h1>
							<div className="field">
								<label htmlFor="rate">Rate:</label>
								<input id="rate" defaultValue={props.data?.expectedRate}/>
							</div>
							<div className="field">
								<label htmlFor="skills">Relevant Skills:</label>
								<input id="skills" defaultValue={props.data?.skillSet}/>
							</div>
							<div className="field">
								<label htmlFor="description">Description:</label>
								<textarea name="description" id="description" defaultValue={props.data?.postContent}/>
							</div>
							<div>
								<button>Update</button>
								<button onClick={props.toggle}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default UpdateListingModal;

